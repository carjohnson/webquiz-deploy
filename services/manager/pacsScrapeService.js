// services/manager/pacsScrapeService.js
const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");
const ExcelJS = require("exceljs");
const { getStamp } = require('../../utils/dirUtils');


// Rename these to match whatever you called them in your Render env settings.
const ORTHANC_URL = process.env.ORTHANC_URL;
const ORTHANC_USER = process.env.ORTHANC_USER;
const ORTHANC_PASS = process.env.ORTHANC_PASS;
const ALLOW_INSECURE_TLS = process.env.ORTHANC_ALLOW_INSECURE_TLS === "true" || "false"; // true for dev

const COLUMNS = [
  "OrthancStudyID",
  "OrthancSeriesID",
  "StudyInstanceUID",
  "SeriesInstanceUID",
  "PatientName",
  "PatientID",
  "SeriesDescription",
];


function getClient() {
  if (!ORTHANC_URL || !ORTHANC_USER || !ORTHANC_PASS) {
    throw new Error(
      "Missing ORTHANC_URL, ORTHANC_USER, or ORTHANC_PASS environment variables."
    );
  }
  return axios.create({
    baseURL: ORTHANC_URL.replace(/\/+$/, ""),
    auth: { username: ORTHANC_USER, password: ORTHANC_PASS },
    timeout: 30000,
    ...(ALLOW_INSECURE_TLS && {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    }),
  });
}

/**
 * Scrapes study/series metadata from Orthanc and writes it to an .xlsx file.
 * Mirrors the shape of backupService.runBackup()'s result so the controller
 * can render it the same way: successCount/failCount/failures + a log file.
 *
 * @param {string} outputsRoot - directory to write the resulting .xlsx into
 * @param {string} logsRoot - directory to write the run log into
 */
async function scrapePacs(outputsRoot, logsRoot) {
  const client = getClient();

  fs.mkdirSync(outputsRoot, { recursive: true });
  fs.mkdirSync(logsRoot, { recursive: true });

//   const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const timestamp = getStamp();
  const outputFileName = `dicom_index_${timestamp}.xlsx`;
  const outputPath = path.join(outputsRoot, outputFileName);
  const logFileName = `pacs_scrape_${timestamp}.log`;
  const logPath = path.join(logsRoot, logFileName);

  const logLines = [];
  const log = (msg) => logLines.push(`[${new Date().toISOString()}] ${msg}`);

  const records = [];
  const failures = [];

  log("Fetching study list from Orthanc...");
  let studies;
  try {
    const resp = await client.get("/studies", { params: { expand: true } });
    studies = resp.data;
  } catch (err) {
    log(`Failed to reach Orthanc: ${err.message}`);
    fs.writeFileSync(logPath, logLines.join("\n"), "utf8");
    throw new Error(`Failed to connect to Orthanc: ${err.message}`);
  }
  log(`Found ${studies.length} studies`);

  for (const study of studies) {
    const studyId = study.ID;
    const studyTags = study.MainDicomTags || {};
    const patientTags = study.PatientMainDicomTags || {};

    const studyUID = studyTags.StudyInstanceUID;
    const patientName = patientTags.PatientName;
    const patientID = patientTags.PatientID;

    let seriesList;
    try {
      // ?expand=true returns full series objects in one call, instead of
      // needing a follow-up GET per series.
      const resp = await client.get(`/studies/${studyId}/series`, {
        params: { expand: true },
      });
      seriesList = resp.data;
    } catch (err) {
      const msg = `Skipping unreadable study ${studyId}: ${err.message}`;
      log(msg);
      failures.push(msg);
      continue;
    }

    for (const series of seriesList) {
      const seriesTags = series.MainDicomTags || {};
      records.push({
        OrthancStudyID: studyId,
        OrthancSeriesID: series.ID,
        StudyInstanceUID: studyUID,
        SeriesInstanceUID: seriesTags.SeriesInstanceUID,
        PatientName: patientName,
        PatientID: patientID,
        SeriesDescription: seriesTags.SeriesDescription,
      });
    }
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("DicomIndex");
  sheet.columns = COLUMNS.map((c) => ({ header: c, key: c, width: 28 }));
  records.forEach((r) => sheet.addRow(r));
  await workbook.xlsx.writeFile(outputPath);

  log(`Done. Extracted ${records.length} series across ${studies.length} studies into ${outputFileName}`);
  fs.writeFileSync(logPath, logLines.join("\n"), "utf8");

  return {
    outputFileName,
    outputPath,
    logFile: logFileName,
    studyCount: studies.length,
    successCount: records.length,
    failCount: failures.length,
    failures,
  };
}

module.exports = { scrapePacs };