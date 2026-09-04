const fs = require('fs').promises;
const path = require('path');

const asyncHandler = require("express-async-handler");
const RulerMeasurements = require('../models/rulermeasurements');
const User = require('../models/user');
const Study = require("../models/study");
const Segmentations = require("../models/segmentations");

const userColors = [
  '#e6194b', '#46f0f0', '#e6beff', '#4363d8', '#f58231',
  '#911eb4', '#b2b43c', '#f032e6', '#bcf60c', '#fabebe',
  '#008080', '#ffe119', '#9a6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'
];

const suspicionScores = [
    '1 - definitely benign',
    '2 - probably benign',
    '3 - indeterminate',
    '4 - probably metastatic',
    '5 - definitely metastatic',
];

//=========================================================
exports.index = asyncHandler(async (req, res, next) => {
  const legend = req.session.legend || [];

  res.render("webquiz", {
    title: "Quiz",
    legend,
    suspicionScores,
  });
});

//=========================================================
exports.post_clear_session = (req, res) => {
  req.session.annotationObjects = null;
  req.session.segmentationObjects = null;
  req.session.legend = null;

  res.json({ status: "Session cleared" });
};

//=========================================================
exports.post_studyid = asyncHandler(async (req, res, next) => {
  let payload = req.body?.payload;

  if (!payload) {
    return res.status(400).json({ error: "Missing payload in request body" });
  }

  // Handle stringified JSON safely
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (err) {
      return res.status(400).json({ error: "Invalid JSON payload format" });
    }
  }

  const studyuid = payload?.studyuid;
  if (!studyuid) {
    return res.status(400).json({ error: "Missing studyuid in payload" });
  }

  const study = await Study.findOne({ studyUID: studyuid });

  if (!study) {
    return res.status(404).json({ error: `Study not found: ${studyuid}` });
  }

  req.session.study_id = study._id;
  res.json({ success: true, study_id: study._id });
});

//=========================================================
exports.list_study_seriesToBeAnnotated = asyncHandler(async (req, res, next) => {
  const { studyUID } = req.query;

  if (!studyUID || typeof studyUID !== 'string') {
    return res.status(400).json({ error: 'studyUID query parameter is required' });
  }

  const study = await Study.findOne({ studyUID });

  if (!study) {
    return res.status(404).json({ error: `Study not found: ${studyUID}` });
  }

  return res.json({
    type: 'list_study_seriesToBeAnnotated',
    payload: study.seriesUIDsToBeAnnotated,
  });
});

//=========================================================
exports.list_users_annotations = asyncHandler(async (req, res, next) => {
  const sessionUser = req.session.user;
  const { username, studyUID } = req.query;
  
  const study = await Study.findOne({ studyUID });
  if (!study) {
    return res.status(404).json({ error: `Study not found (${studyUID}) when listing annotations` });
  }
  const study_id = study._id;

  if (!sessionUser) {
    return res.status(401).json({ error: `User not authenticated (${username}) when listing annotations` });
  }

  let annotationsList = [];
  let legend = [];

  if (sessionUser.role === 'admin') {
    const studyAnnotations = await RulerMeasurements.find({ study_id });

    // 🧮 Map user ID to index
    const uniqueUserIds = [...new Set(studyAnnotations.map(doc => doc.user_id.toString()))];
    const userIndexMap = new Map();
    uniqueUserIds.forEach((userId, idx) => {
      userIndexMap.set(userId, idx);
    });

    // build list of annotations with user id and assigned color
    annotationsList = studyAnnotations.map(doc => ({
      data: doc.data,
      user_id: doc.user_id,
      color: userColors[userIndexMap.get(doc.user_id.toString()) % userColors.length]
    }));

    const users = await User.find({ _id: { $in: uniqueUserIds } });
    const userNameMap = new Map();
    users.forEach(user => {
      userNameMap.set(user._id.toString(), user.username);
    });

    legend = uniqueUserIds.map(userId => ({
      user_id: userId,
      user_name: userNameMap.get(userId),
      color: userColors[userIndexMap.get(userId) % userColors.length],
      index: userIndexMap.get(userId)
    }));

  } else if (sessionUser.role === 'reader') {
    const userid = sessionUser._id;
    const userAnnotations = await RulerMeasurements.find({
      user_id: userid,
      study_id,
    });

    const user = await User.findOne({ _id: userid });
    const username = user?.username ?? 'Unknown';

    annotationsList = userAnnotations.map(doc => ({
      data: doc.data,
      user_id: doc.user_id,
      color: userColors[1]
    }));

    legend = [{
      user_id: userid.toString(),
      user_name: username,
      color: userColors[1],
      index: 1
    }];
  }

    // console.log('🧮 Annotations list with colours', annotationsList);
    res.json({ type: 'list-users-annotations', payload: annotationsList, legend });
});

//=========================================================
exports.list_study_segmentations = asyncHandler(async (req, res, next) => {
  const sessionUser = req.session.user;
  const { username, studyUID } = req.query;

  if (!sessionUser) {
    return res.status(401).json({ error: `User not authenticated (${username})` });
  }

  const study = await Study.findOne({ studyUID });
  if (!study) {
    return res.status(404).json({ error: `Study not found (${studyUID}) when retrieving segmentations` });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: `User not found (${username}) when retrieving segmentations` });
  }

    const userStudySegmentations = await Segmentations.find({
      user_id: user._id,
      study_id: study._id,
    });

    const segmentationsList = [];

    for (const segDoc of userStudySegmentations) {
      for (const entry of segDoc.segmentationIds) {
        const dbSegmentInfo = entry.segments.map(seg => ({
          segmentMaskValue: seg.segmentMaskValue,
          label: seg.label,
          cachedStats: seg.cachedStats,
          groundTruth: seg.groundTruth,
          referenceStandardMethod: seg.referenceStandardMethod,
          hepaticSegment: seg.hepaticSegment,
        }));

        segmentationsList.push({
          segmentationId: entry.segmentationId,
          referencedSeriesUID: entry.sourceSeriesInstanceUid,
          segmentationLabel: entry.label,
          dbSegmentInfo,
          segmentationFileUrl: `/webquiz/get-segmentation-file?segmentationId=${entry.segmentationId}`,
        });
      }
    }

    res.json({ type: 'list-study-segmentations', payload: segmentationsList });
});

// =========================================================
exports.get_segmentation_file = asyncHandler(async (req, res, next) => {
  const { segmentationId } = req.query;
  const sessionUser = req.session.user;
 
  if (!segmentationId) {
    return res.status(400).json({ error: 'Missing segmentationId query parameter' });
  }
  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
 
  const segDoc = await Segmentations.findOne({
    'segmentationIds.segmentationId': segmentationId,
  });
 
  if (!segDoc) {
    return res.status(404).json({ error: `Segmentation document not found for ID: ${segmentationId}` });
  }
 
  if (segDoc.user_id.toString() !== sessionUser._id.toString()) {
    return res.status(403).json({ error: 'Forbidden: Access to segmentation denied' });
  }
 
  const entry = segDoc.segmentationIds.find(e => e.segmentationId === segmentationId);
 
  if (!entry?.segmentationDataRef) {
    return res.status(404).json({ error: 'SEG file reference missing in segmentation document' });
  }
 
  const fileBuffer = await safeReadFile(entry.segmentationDataRef);
 
    if (!fileBuffer) {
      return res.status(404).json({ error: 'SEG file not found on disk' });
    }
 
  res.set({
    'Content-Type': 'application/dicom',
    'Content-Length': fileBuffer.length,
  });
 
  res.send(fileBuffer);
});

// =========================================================
exports.post_segmentationObjects = asyncHandler(async (req, res, next) => {
  // >>>>>  Segmentation objects - blob data  <<<<<<<<<<<<<<<<<<<<<<<<<<<
  // console.log('📥 Incoming POST for Segmentation ... length:', Object.keys(req.body).length);
 
  if (Object.keys(req.body).length > 0) {
    // console.log('✅ Saving segmentations:', req.body);
    // console.log('✅ Saving segmentations:');
    const segmentations = [];
    const username = req.session?.user?.username;
    const study_id = req.session?.study_id;

    if (!username || !study_id) {
      return res.status(400).json({ error: "Missing session context (username or study_id)" });
    }
 
    // Reconstruct array from segObj_X_metadata + blobs 
    for (const field of Object.keys(req.body)) {
      if (field.endsWith('_metadata')) {
        const match = field.match(/segObj_(\d+)_metadata/);
        if (!match) continue;
        
        const index = parseInt(match[1]);
        
        let metadata;
        try {
          metadata = JSON.parse(req.body[field]);
        } catch (e) {
          return res.status(400).json({ error: `Invalid JSON metadata for ${field}` });
        }
        
        const blobFile = req.files?.find(f => f.fieldname === `segObj_${index}_blob`);
        
        if (blobFile) {
          // ---- Save to flat file storage on the Node app's disk ----
          // Resolve the DICOM StudyInstanceUID so the folder shape is
          // consistent: <root>/username/studyName/segmentationId.dcm
          const studyDoc = await Study.findById(study_id);
          if (!studyDoc) {
            return res.status(404).json({ error: `Study not found in DB for ID: ${study_id}` });
          }
          const studyName = studyDoc.studyName;
          const { dir, filepath } = segFilePath(username, studyName, metadata.segmentationId);

          // Ensure directory exists, and keep permissions open so the
          // node app (and any other process on the box) can read/write/
          // delete these files later regardless of the umask.
          await fs.mkdir(dir, { recursive: true });
          await fs.chmod(dir, 0o777);

          await fs.writeFile(filepath, blobFile.buffer);
          await fs.chmod(filepath, 0o666);
          // console.log(`💾 Saved segfile ${blobFile.size} bytes to ${filepath}`);

          metadata.segmentationDataRef = filepath;
        } else {
          console.warn(`⚠️ No blob found for segObj_${index}_blob`);
        }
        segmentations[index] = metadata;
      }
    }
 
    const validSegs = segmentations.filter(Boolean);
    
    await saveSegmentationsToDB(validSegs, req);
    res.json({ success: true, count: validSegs.length });
 
  } else {
    // ---- Last segmentation deleted ---- remove from DB and file storage
    const userid = req.session?.user?._id;
    const study_id = req.session?.study_id;
    if (!userid || !study_id) {
      console.warn('⚠️ Missing userid/study_id, skipping delete');
      return res.json({ success: true });
    } 
    // get references to seg files stored - for deletion
    const existingSegmentations = await Segmentations.findOne({ user_id: userid, study_id });
 
    if (existingSegmentations) {
      for (const segId of existingSegmentations.segmentationIds) {
        if (segId.segmentationDataRef) {
          // segmentationDataRef is always a plain filesystem path 
          //  - delete the file from the Node app's flat file storage.
          try {
            await fs.unlink(segId.segmentationDataRef);
          } catch (err) {
            console.warn('⚠️ Failed to delete file:', segId.segmentationDataRef, err);
          }
        }
      } // end for each segId
 
      await Segmentations.deleteMany({ study_id, user_id: userid });
      // console.log('🗑️ All segmentations deleted from DB for study', study_id, 'user', userid);
    }
    res.json({ success: true });
  } // end else - last seg deleted
});

//=========================================================
exports.post_annotationObjects = handleSessionPost({ key: 'annotationObjects', keyLabel: 'annotationObjects' });

//=========================================================
exports.post_legend = handleSessionPost({ key: 'legend', keyLabel: 'legend' });

//=========================================================
// >>>>>>>>>>>>> Helper functions <<<<<<<<<<<<<
//=========================================================
function handleSessionPost({ key, keyLabel }) {
  return asyncHandler(async (req, res, next) => {
    let payload = req.body?.payload;

    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        return res.status(400).json({ error: `Invalid JSON payload format for ${keyLabel}` });
      }
    }

    const data = payload?.[key];
    if (!data) return res.status(400).json({ error: `Missing ${keyLabel} in payload` });

      req.session[key] = data;

      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      if (key === 'annotationObjects' && Array.isArray(data)) {
        if (data.length > 0) {
          await saveAnnotationsToDB(data, req);
        } else {
          // last annotation for this userid/studyid has been deleted
          //  clear all entries from the database
          const userid = req.session?.user?._id;
          const study_id = req.session?.study_id;

          if (!userid || !study_id) {
            console.warn('⚠️ Missing userid/studyid, skipping delete');
          } else {
            await RulerMeasurements.deleteMany({ study_id, user_id: userid });
          }
        }
      }

      res.json({ status: 'ok' });
  });
}

//=========================================================
async function saveAnnotationsToDB(annotationObjects, req) {
  const username = req.session?.user?.username;
  const study_id = req.session?.study_id;

  if (!username || !study_id) {
    throw new Error("Missing user or study ID in session when saving annotations");
  }

    const existingAnnotation = await RulerMeasurements.findOne({
      user_id: req.session.user._id,
      study_id: req.session.study_id,
    });

    if (existingAnnotation) {
      existingAnnotation.data = annotationObjects;
    existingAnnotation.created_at = new Date();
      await existingAnnotation.save();
    } else {
      const newAnnotation = new RulerMeasurements({
        user_id: req.session.user._id,
        study_id,
        data: annotationObjects
      });
      await newAnnotation.save();
  }
}

//=========================================================
async function saveSegmentationsToDB(segmentationObjects, req) {
  const username = req.session?.user?.username;
  const study_id = req.session?.study_id;

  if (!username || !study_id) {
    throw new Error("Missing user or study ID in session when saving segmentations");
  }

  const parent = await Segmentations.findOne({
      user_id: req.session.user._id,
      study_id,
    });

  if (segmentationObjects.length === 0) {
    // no segmentation objects for this study (deleted in frontend)
    if (parent) {
      // ✅ Delete the SEG files on disk for every entry before wiping the DB record
      for (const seg of parent.segmentationIds) {
        if (seg.segmentationDataRef) {
          try {
            await fs.unlink(seg.segmentationDataRef);
            // console.log('🗑️ Deleted SEG file:', seg.segmentationDataRef);
          } catch (err) {
            console.warn('⚠️ Failed to delete SEG file:', seg.segmentationDataRef, err);
          }
        }
      }
      parent.segmentationIds = [];
      await parent.save();
      // console.log('🗑️ All segmentations deleted for this study');
    }
  } else {
    const incomingSegs = segmentationObjects.map(seg => ({
      ...seg,
      segments: seg.segments.map(s => ({
        ...s,
        segmentMaskValue: s.segmentIndex,
      })),
    }));
    const incomingIds = incomingSegs.map(s => s.segmentationId);

    if (!parent) {
      // No parent exists → create new document with all incoming segmentations
      const newParent = new Segmentations({
        user_id: req.session.user._id,
        study_id,
        segmentationIds: incomingSegs.map(seg => ({
          ...seg,
          created_at: new Date(),
        })),
      });

      await newParent.save();
      return;
    }

    // -----------------------------
    // 1. DELETE removed segmentations (DB entry + SEG file on disk)
    // -----------------------------
    const removedSegs = parent.segmentationIds.filter(
      dbSeg => !incomingIds.includes(dbSeg.segmentationId)
    );

    for (const seg of removedSegs) {
      if (seg.segmentationDataRef) {
        try {
          await fs.unlink(seg.segmentationDataRef);
          // console.log('🗑️ Deleted SEG file:', seg.segmentationDataRef);
        } catch (err) {
          console.warn('⚠️ Failed to delete SEG file:', seg.segmentationDataRef, err);
        }
      }
    }

    parent.segmentationIds = parent.segmentationIds.filter(dbSeg =>
      incomingIds.includes(dbSeg.segmentationId)
    );

    // -----------------------------
    // 2. UPDATE existing + ADD new
    // -----------------------------
    for (const seg of incomingSegs) {
      const index = parent.segmentationIds.findIndex(
        s => s.segmentationId === seg.segmentationId
      );

      if (index !== -1) {
        parent.segmentationIds[index] = {
          ...parent.segmentationIds[index],
          ...seg,
          created_at: new Date(),
        };
      } else {
        parent.segmentationIds.push({
          ...seg,
          created_at: new Date(),
        });
      }
    }

    // -----------------------------
    // 3. SAVE ONCE
    // -----------------------------
    await parent.save();
  }
}

//=========================================================
// HELPERS
//=========================================================

async function safeReadFile(path) {
  try {
    return await fs.readFile(path);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`⚠️ Requested file missing on disk: ${path}`);
      return null;
    }
    throw err;
  }
}

//=========================================================
// Build auth header from ORTHANC_USER and ORTHANC_PASS in env vars
function orthancHeaders(extra = {}) {
  const headers = { ...extra };
  if (process.env.ORTHANC_USER && process.env.ORTHANC_PASS) {
    const creds = Buffer.from(`${process.env.ORTHANC_USER}:${process.env.ORTHANC_PASS}`).toString('base64');
    headers['Authorization'] = `Basic ${creds}`;
  }
  return headers;
}

//=========================================================
// Converts a MongoDB ObjectId string to a stable attachment ID in [1024, 65535]
function attachmentIdFromUserId(userId) {
  const hex = userId.toString().slice(-4);
  const num = parseInt(hex, 16); // 0 - 65535
  return Math.max(1024, num);    // ensure >= 1024
}

//=========================================================
// Looks up the Orthanc internal study UUID from a DICOM StudyInstanceUID
async function getOrthancStudyId(studyInstanceUID) {
  const response = await fetch(`${process.env.ORTHANC_URL}/tools/lookup`, {
    method: 'POST',
    headers: orthancHeaders({ 'Content-Type': 'application/json' }),
    body: studyInstanceUID,
  });

  if (!response.ok) {
    throw new Error(`Orthanc lookup failed: ${response.status}`);
  }

  const results = await response.json();

  const studyMatch = results.find(r => r.Type === 'Study');
  if (!studyMatch) {
    throw new Error(`No Orthanc study found for UID: ${studyInstanceUID}`);
  }
  return studyMatch.ID;
}

//=========================================================
const SEG_STORAGE_ROOT = path.join(__dirname, '../outputs', 'segmentations');
 
/**
 * Resolves the on-disk directory + file path for a given user/study/segmentation,
 * as <root>/<username>/<studyName>/<segmentationId>.dcm
 */
function segFilePath(username, studyName, segmentationId) {
  const safeUsername = String(username).replace(/[^a-zA-Z0-9-_]/g, '_');
  const safeStudyName = String(studyName).replace(/[^a-zA-Z0-9.-]/g, '_');
  const safeSegId = String(segmentationId).replace(/[^a-zA-Z0-9-]/g, '_');
  const dir = path.join(SEG_STORAGE_ROOT, safeUsername, safeStudyName);
  return { dir, filepath: path.join(dir, `${safeSegId}.dcm`) };
}