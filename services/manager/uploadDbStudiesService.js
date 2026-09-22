require("dotenv").config();

const path = require("path");
const fsSync = require("fs");
const fsPromise = require("fs/promises");
const ExcelJS = require("exceljs");
const { connectToModeDb, ensureDatabaseExists } = require("../../utils/dbConnection");
const { getStamp } = require("../../utils/dirUtils");

// =========================================================
// Helper to inspect staged file contents for preview modal/UI
// =========================================================
exports.getStagedExcelStudiesCount = async (stagingDir) => {
  if (!stagingDir || !fsSync.existsSync(stagingDir)) {
    throw new Error("Staging directory not found.");
  }

  const files = fsSync.readdirSync(stagingDir);
  const excelFile = files.find((f) => f.endsWith(".xlsx") || f.endsWith(".xls"));
  if (!excelFile) {
    throw new Error("No Excel file found in staging directory.");
  }

  const filePath = path.join(stagingDir, excelFile);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) return { studyCount: 0, fileName: excelFile };

  const uniqueStudyUIDs = new Set();
  
  // Find column index for StudyInstanceUID from header row
  const headerRow = worksheet.getRow(1);
  let studyUidColIndex = -1;

  headerRow.eachCell((cell, colNumber) => {
    if (String(cell.value || "").trim() === "StudyInstanceUID") {
      studyUidColIndex = colNumber;
    }
  });

  if (studyUidColIndex !== -1) {
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header
      const studyUID = String(row.getCell(studyUidColIndex).value || "").trim();
      if (studyUID) uniqueStudyUIDs.add(studyUID);
    });
  }

  return { studyCount: uniqueStudyUIDs.size, fileName: excelFile };
};

// =========================================================
// Main Upload Logic
// =========================================================
exports.runUploadDbStudies = async (stagingDir, envMode, logsRoot) => {
  await fsPromise.mkdir(logsRoot, { recursive: true });
  const logFile = path.join(logsRoot, `UploadDbStudiesLog_${getStamp()}.log`);

  let successCount = 0;
  let failCount = 0;
  const failures = [];

  const logLine = async (msg) => {
    await fsPromise.appendFile(logFile, `[${new Date().toISOString()}] ${msg}\n`);
  };

  try {
    const logHeader = [
      `*** RUNNING EXCEL TO DB STUDIES IMPORT ***`,
      `Staging Dir: ${stagingDir}`,
      `Mode: ${envMode}`,
      `Log File: ${logFile}`,
    ].join("\n");

    console.log(logHeader);
    await logLine(logHeader);

    // Locate Excel file in staging folder
    const files = await fsPromise.readdir(stagingDir);
    const excelFile = files.find((f) => f.endsWith(".xlsx") || f.endsWith(".xls"));
    if (!excelFile) {
      throw new Error("No Excel file found in staging directory.");
    }

    const filePath = path.join(stagingDir, excelFile);

    // 1. Connect and verify database
    const { db, dbName } = await connectToModeDb(envMode);
    await ensureDatabaseExists(db);
    await logLine(`Connected to Database: ${dbName}`);

    // 2. Clear existing studies collection completely
    const collection = db.collection("study");
    const deleteResult = await collection.deleteMany({});
    await logLine(`Wiped existing 'study' collection. Deleted ${deleteResult.deletedCount} old record(s).`);

    // 3. Parse Excel file from disk using ExcelJS
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) throw new Error("Excel file contains no worksheets.");

    // Map header column names to column indexes
    const headerRow = worksheet.getRow(1);
    const colMap = {};

    headerRow.eachCell((cell, colNumber) => {
      const headerName = String(cell.value || "").trim();
      if (headerName) {
        colMap[headerName] = colNumber;
      }
    });

    if (!colMap["StudyInstanceUID"]) {
      throw new Error("Required header 'StudyInstanceUID' missing from Excel sheet.");
    }

    // Helper to safely extract string cell values
    const getCellValue = (row, colName) => {
      const colIdx = colMap[colName];
      if (!colIdx) return "";
      const val = row.getCell(colIdx).value;
      if (val === null || val === undefined) return "";
      if (typeof val === "object" && val.text) return String(val.text).trim(); // Hyperlinks/RichText
      return String(val).trim();
    };

    // 4. Group rows by StudyInstanceUID (matching Python Pandas logic)
    const studyMap = new Map();
    let totalRowCount = 0;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      totalRowCount++;

      const studyUID = getCellValue(row, "StudyInstanceUID");
      if (!studyUID) return;

      const seriesUID = getCellValue(row, "SeriesInstanceUID");
      const patientName = getCellValue(row, "PatientName");
      const protocol = getCellValue(row, "Protocol");

      if (!studyMap.has(studyUID)) {
        studyMap.set(studyUID, {
          protocol: protocol,
          studyUID: studyUID,
          studyName: patientName,
          seriesUIDsToBeAnnotated: new Set(),
        });
      }

      if (seriesUID) {
        studyMap.get(studyUID).seriesUIDsToBeAnnotated.add(seriesUID);
      }
    });

    await logLine(`Parsed ${totalRowCount} total row(s) from sheet '${worksheet.name}'.`);

    const formattedStudies = Array.from(studyMap.values()).map((study) => ({
      protocol: study.protocol,
      studyUID: study.studyUID,
      studyName: study.studyName,
      seriesUIDsToBeAnnotated: Array.from(study.seriesUIDsToBeAnnotated),
    }));

    if (formattedStudies.length === 0) {
      throw new Error("No valid study records with 'StudyInstanceUID' found in file.");
    }

    // 5. Insert documents into MongoDB
    const insertResult = await collection.insertMany(formattedStudies);
    successCount = insertResult.insertedCount;

    await logLine(`Successfully inserted ${successCount} study document(s) into 'study' collection.`);

    return {
      stagingDir,
      logFile,
      insertedCount: successCount,
      totalStudies: formattedStudies.length,
      deletedCount: deleteResult.deletedCount,
      failCount: 0,
      failures: [],
    };
  } catch (err) {
    failCount++;
    failures.push({ file: stagingDir, error: err.message });
    await logLine(`FAILED Excel import: ${err.message}`).catch(() => {});

    return {
      stagingDir,
      logFile,
      insertedCount: 0,
      totalStudies: 0,
      deletedCount: 0,
      failCount,
      failures,
      error: err.message,
    };
  }
};