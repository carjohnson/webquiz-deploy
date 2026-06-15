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

  // connect to *.pug view
  res.render("webquiz", {
    title: "Quiz",
    legend,
    suspicionScores,
  });

});

exports.post_clear_session = (req, res) => {
  req.session.annotationObjects = null;
  req.session.segmentationObjects = null;
  req.session.legend = null;

  console.log("🧹 Session cleared");
  res.json({ status: "Session cleared" });
};

//=========================================================
exports.post_studyid = async (req, res) => {
  // console.log("📥 Incoming POST for studyid");
  // console.log("🔍 Body:", req.body);
  // console.log("🧪 Session BEFORE lookup:", req.session);

  try {
    let payload = req.body.payload;
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (err) {
        console.error("❌ Failed to parse payload JSON:", err, payload);
        return res.status(400).json({ error: "Invalid JSON payload" });
      }
    }

    const studyuid = payload.studyuid;
    // console.log("📌 Extracted studyuid:", studyuid);

    const study = await Study.findOne({ studyUID: studyuid });

    if (!study) {
      console.log("❌ Study not found for UID:", studyuid);
      return res.status(404).json({ error: "Study not found" });
    }

    req.session.study_id = study._id;
    // console.log("💾 Session AFTER saving study_id:", req.session);
    res.json({ success: true, study_id: study._id });
  } catch (err) {
    console.error("❌ Error in post_studyid:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//=========================================================
// route to send either all users' annotations or a specific user's annotations to the Viewer iframe when requested
//  This is not relayed through the parent. The request from the viewer is direct to the server
exports.list_users_annotations = asyncHandler(async (req, res, next) => {
  const sessionUser = req.session.user;
  const { username, studyUID } = req.query;
  const study = await Study.findOne({ studyUID });
  const study_id = study._id;

  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (!study_id) {
    return res.status(400).json({ error: 'Missing study ID in session' });
  }

  try {

    let annotationsList = [];


    if (sessionUser.role === 'admin') {
      // Admin: get all annotations for the specified study
      const studyAnnotations = await RulerMeasurements.find({study_id});

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

      // get user name for legend
      const users = await User.find({
        _id: { $in: uniqueUserIds}
      });
      const userNameMap = new Map();
      users.forEach(user => {
        userNameMap.set(user._id.toString(), user.username);
      })

      var legend = uniqueUserIds.map(userId => ({
        user_id: userId,
        user_name: userNameMap.get(userId),
        color: userColors[userIndexMap.get(userId) % userColors.length],
        index: userIndexMap.get(userId)
      }));

    } else {
      // Reader: get annotations for this user and study
      const userid = sessionUser._id;
      const userAnnotations = await RulerMeasurements.find({
        user_id: userid,
        study_id,
      });

      const user = await(User.findOne({
        _id: userid
      }));
      const username = user?.username ?? 'Unknown';

      annotationsList = userAnnotations.map(doc => ({
        data: doc.data,
        user_id: doc.user_id,
        color: userColors[1]
      }));

      var legend = [{
        user_id: userid.toString(),
        user_name: username,
        color: userColors[1],
        index: 1
      }];

    }

    // console.log('🧮 Annotations list with colours', annotationsList);
    res.json({ type: 'list-users-annotations', payload: annotationsList, legend });
  } catch (err) {
    console.error('❌ Error retrieving annotations:', err);
    next(err);
  }
});

//=========================================================
exports.list_study_segmentations = asyncHandler(async (req, res, next) => {
  const sessionUser = req.session.user;
  const { username, studyUID } = req.query;

  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const study = await Study.findOne({ studyUID });
  if (!study) {
    return res.status(400).json({ error: 'Study not found' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  try {
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
  } catch (err) {
    console.error('❌ Error retrieving segmentations:', err);
    next(err);
  }
});

// =========================================================
exports.get_segmentation_file = asyncHandler(async (req, res, next) => {
  const { segmentationId } = req.query;
  const sessionUser = req.session.user;

  if (!segmentationId) {
    return res.status(400).json({ error: 'Missing segmentationId query param' });
  }
  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const segDoc = await Segmentations.findOne({
    'segmentationIds.segmentationId': segmentationId,
  });

  if (!segDoc) {
    return res.status(404).json({ error: 'Segmentation not found' });
  }

  // Auth: ensure this segmentation belongs to the session user
  if (segDoc.user_id.toString() !== sessionUser._id.toString()) {
    return res.status(403).json({ error: 'Forbidden: not your segmentation' });
  }

  const entry = segDoc.segmentationIds.find(e => e.segmentationId === segmentationId);

  if (!entry?.segmentationDataRef) {
    return res.status(404).json({ error: 'SEG file reference missing' });
  }

  let fileBuffer;
  if (process.env.NODE_ENV !== 'production') {

    try {
      fileBuffer = await safeReadFile(entry.segmentationDataRef);
    } catch (err) {
      console.error('❌ Failed to read SEG file:', entry.segmentationDataRef, err);
      return res.status(500).json({ error: 'Failed to read SEG file' });
    }

    if (!fileBuffer) {
      return res.status(404).json({ error: 'SEG file not found on disk' });
    }
  } else {
    // // for production, entry.segmentationDataRef is now the Orthanc instance UUID e.g. "a3f2c1d4-..."
    // const orthancId = entry.segmentationDataRef;
    // const orthancFileUrl = `${process.env.ORTHANC_URL}/instances/${orthancId}/file`;

    // let response;
    // try {
    //   response = await fetch(orthancFileUrl, {
    //     headers: orthancHeaders(),
    //   });
    // } catch (err) {
    //   console.error('❌ Failed to reach Orthanc:', err);
    //   return res.status(502).json({ error: 'Could not connect to Orthanc' });
    // }

    // Parse the stored reference — { orthancStudyId, attachmentId }
    let ref;
    try {
      ref = JSON.parse(entry.segmentationDataRef);
      console.log('🔍 Parsed ref:', ref);
    } catch {
      return res.status(500).json({ error: 'Malformed segmentationDataRef in DB' });
    }

    const { orthancStudyId, attachmentId } = ref;
    const attachmentUrl = `${process.env.ORTHANC_URL}/studies/${orthancStudyId}/attachments/${attachmentId}/data`;

    let response;
    try {
      response = await fetch(attachmentUrl, { headers: orthancHeaders() });
    } catch (err) {
      console.error('❌ Failed to reach Orthanc:', err);
      return res.status(502).json({ error: 'Could not connect to Orthanc' });
    }

    if (!response.ok) {
      console.error(`❌ Orthanc returned ${response.status} for instance ${orthancId}`);
      return res.status(404).json({ error: 'SEG file not found in Orthanc' });
    }

    const arrayBuffer = await response.arrayBuffer();
    console.log('🔍 arrayBuffer byteLength:', arrayBuffer?.byteLength);
    const fileBuffer = Buffer.from(arrayBuffer);
    console.log('🔍 fileBuffer length:', fileBuffer?.length);

  }

  res.set({
    'Content-Type': 'application/dicom',
    'Content-Length': fileBuffer.length,
  });

  res.send(fileBuffer);
});
//=========================================================
exports.post_segmentationObjects = async (req, res) => {
  // >>>>>  Segmentation objects - blob data  <<<<<<<<<<<<<<<<<<<<<<<<<<<
  console.log('📥 Incoming POST for Segmentation ... length:', Object.keys(req.body).length);

  if (Object.keys(req.body).length > 0) {
    // console.log('✅ Saving segmentations:', req.body);
    console.log('✅ Saving segmentations:');
    const segmentations = [];
    const username = req.session.user.username;
    const study_id = req.session.study_id;

    // Reconstruct array from segObj_X_metadata + blobs 
    for (const field of Object.keys(req.body)) {
      if (field.endsWith('_metadata')) {

        const match = field.match(/segObj_(\d+)_metadata/);
        if (!match) continue;
        
        const index = parseInt(match[1]);
        const metadata = JSON.parse(req.body[field]);
        
        // ✅ Now safely find matching blob
        const blobFile = req.files?.find(f => f.fieldname === `segObj_${index}_blob`);
        
        if (blobFile) {
          if (process.env.NODE_ENV !== 'production') {
            // ---- Development: save to local disk ----
            const safeSegId = metadata.segmentationId.replace(/[^a-zA-Z0-9-]/g, '_');
            const filename = `${study_id}_${username}_${safeSegId}.dcm`;
            const filepath = path.join(__dirname, '../segmentations', filename);
            

            // Ensure directory exists
            await fs.mkdir(path.dirname(filepath), { recursive: true });
            // ✅ Save blob to disk
            await fs.writeFile(filepath, blobFile.buffer);
            console.log(`💾 Saved ${blobFile.size} bytes to ${filepath}`);
            
            metadata.segmentationDataRef = filepath;
          } else {
            // ---- Production: store as Orthanc custom attachment ----
          //   let orthancResponse;
          //   try {
          //     orthancResponse = await fetch(`${process.env.ORTHANC_URL}/instances`, {
          //       method: 'POST',
          //       headers: orthancHeaders({ 'Content-Type': 'application/dicom' }),
          //       body: blobFile.buffer,
          //     });
          //   } catch (err) {
          //     console.error('❌ Failed to reach Orthanc during upload:', err);
          //     return res.status(502).json({ error: 'Could not connect to Orthanc' });
          //   }

          //   if (!orthancResponse.ok) {
          //     const text = await orthancResponse.text();
          //     console.error(`❌ Orthanc rejected SEG upload (${orthancResponse.status}):`, text);
          //     return res.status(500).json({ error: 'Orthanc rejected the SEG file' });
          //   }

          //   const orthancResult = await orthancResponse.json();
          //   // orthancResult.ID is the Orthanc instance UUID — this is our persistent reference
          //   const orthancInstanceId = orthancResult.ID;

          //   console.log(`✅ SEG stored in Orthanc with instance ID: ${orthancInstanceId}`);

          //   // Store the Orthanc UUID in place of the old filepath
          //   metadata.segmentationDataRef = orthancInstanceId;

          // }


            try {
              // Step 1: Get DICOM StudyInstanceUID from MongoDB using session study_id
              const studyDoc = await Study.findById(req.session.study_id);
              if (!studyDoc) {
                console.error('❌ Study not found in DB for study_id:', req.session.study_id);
                return res.status(404).json({ error: 'Study not found' });
              }
              const studyInstanceUID = studyDoc.studyUID;
              console.log('🔍 Resolved studyInstanceUID:', studyInstanceUID);

              // Step 2: Resolve Orthanc's internal study UUID from the DICOM UID
              const orthancStudyId = await getOrthancStudyId(studyInstanceUID);
              console.log('🔍 Resolved Orthanc study ID:', orthancStudyId);

              // Step 3: Derive a stable per-user attachment ID
              const attachmentId = attachmentIdFromUserId(req.session.user._id);

              // Step 4: PUT the SEG binary as a custom attachment on the study
              const putUrl = `${process.env.ORTHANC_URL}/studies/${orthancStudyId}/attachments/${attachmentId}`;
              const putResponse = await fetch(putUrl, {
                method: 'PUT',
                headers: orthancHeaders({ 'Content-Type': 'application/octet-stream' }),
                body: blobFile.buffer,
              });

              if (!putResponse.ok) {
                const text = await putResponse.text();
                console.error(`❌ Orthanc rejected attachment PUT (${putResponse.status}):`, text);
                return res.status(500).json({ error: 'Orthanc rejected the SEG attachment' });
              }

              // Step 5: Store the reference needed to retrieve/delete it later
              metadata.segmentationDataRef = JSON.stringify({ orthancStudyId, attachmentId });
              console.log(`✅ SEG stored as Orthanc attachment ${attachmentId} on study ${orthancStudyId}`);

            } catch (err) {
              console.error('❌ Failed to store SEG in Orthanc:', err);
              return res.status(502).json({ error: 'Could not store SEG in Orthanc' });
            }
          }
        
      } else {
        console.warn(`⚠️ No blob found for segObj_${index}_blob`);
      }
        segmentations[index] = metadata;
      }
    }  // end for loop

    const validSegs = segmentations.filter(Boolean);
    console.log('✅ Reconstructed:', validSegs);
    
    await saveSegmentationsToDB(validSegs, req);
    res.json({ success: true, count: validSegs.length });

  } else {
    // ---- Last segmentation deleted ---- remove from DB and file storage
    const userid = req.session.user._id;
    const study_id = req.session.study_id;
    if (!userid || !study_id) {
      console.warn('⚠️ Missing userid/study_id, skipping delete');
      return res.json({ success: true });
    } 
    // get references to seg files stored - for deletion
    const existingSegmentations = await Segmentations.findOne({ user_id: userid, study_id });

    if (existingSegmentations) {
      for (const segId of existingSegmentations.segmentationIds) {
        if (segId.segmentationDataRef) {
          if (process.env.NODE_ENV !== 'production') {
            // Development: delete local file
            try {
              await fs.unlink(segId.segmentationDataRef);
              console.log('🗑️ Deleted file:', segId.segmentationDataRef);
            } catch (err) {
              console.warn('⚠️ Failed to delete file:', segId.segmentationDataRef, err);
            }
          } else {
            // Production: delete Orthanc attachment
            // const orthancId = segId.segmentationDataRef;
            // try {
            //   const deleteResponse = await fetch(`${process.env.ORTHANC_URL}/instances/${orthancId}`, {
            //     method: 'DELETE',
            //     headers: orthancHeaders(),
            //   });
            //   if (deleteResponse.ok) {
            //     console.log(`🗑️ Deleted Orthanc instance: ${orthancId}`);
            //   } else {
            //     console.warn(`⚠️ Orthanc DELETE returned ${deleteResponse.status} for ${orthancId}`);
            //   }
            // } catch (err) {
            //   console.warn('⚠️ Failed to delete from Orthanc:', orthancId, err);
            // }
            let ref;
            try {
              ref = JSON.parse(segId.segmentationDataRef);
            } catch {
              console.warn('⚠️ Malformed segmentationDataRef, skipping:', segId.segmentationDataRef);
              continue;
            }

            const { orthancStudyId, attachmentId } = ref;
            try {
              const deleteResponse = await fetch(
                `${process.env.ORTHANC_URL}/studies/${orthancStudyId}/attachments/${attachmentId}`,
                { method: 'DELETE', headers: orthancHeaders() }
              );
              if (deleteResponse.ok) {
                console.log(`🗑️ Deleted Orthanc attachment ${attachmentId} from study ${orthancStudyId}`);
              } else {
                console.warn(`⚠️ Orthanc DELETE returned ${deleteResponse.status}`);
              }
            } catch (err) {
              console.warn('⚠️ Failed to delete from Orthanc:', err);
            }
          } // for production
        }
      } // end for each segId

      await Segmentations.deleteMany({ study_id, user_id: userid });
      console.log('🗑️ All segmentations deleted from DB for study', study_id, 'user', userid);
    }
    res.json({ success: true });
  } // end else - last seg deleted
}

//=========================================================
exports.post_annotationObjects = handleSessionPost( {key: 'annotationObjects', keyLabel: 'annotationObjects'});

//=========================================================
exports.post_legend = handleSessionPost( {key: 'legend', keyLabel: 'legend'});

//=========================================================

//=========================================================
// >>>>>>>>>>>>> Helper functions <<<<<<<<<<<<<
//=========================================================
function handleSessionPost({ key, keyLabel }) {
  return async (req, res, next) => {

    // 🔎 Log the raw payload and the extracted data - for debug
    console.log(`📥 Incoming POST for ${keyLabel}`, '... Key :', key);
    // console.log('🔎 In handleSessionPost ... req', req.body);
    // console.log('Full req.body:', JSON.stringify(req.body, null, 2));
    // console.log(`Extracted data for key "${key}":`, JSON.stringify(data, null, 2));


    // >>>>>  JSON strings  <<<<<<<<<<<<<<<<<<<<<<<<<<<

    let payload = req.body.payload;
    // if payload is a JSON string, parse it
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        console.error('❌ Failed to parse payload JSON:', e, 'payload:', req.body.payload);
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
    }

    const data = payload?.[key];
    if (!data) return res.status(400).json({ error: `Missing ${keyLabel}` });

    try {

      req.session[key] = data;

      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      console.log(`✅ ${keyLabel} session saved`);
      if (key === 'legend') {
      }

      // >>>>>  annotation objects - JSON strings

      if (key === 'annotationObjects' && Array.isArray(data)) {
        if (data.length > 0) {
          await saveAnnotationsToDB(data, req);
          console.log('✅ Annotations saved to DB');
        } else {
          // last annotation for this userid/studyid has been deleted
          //  clear all entries from the database
          const userid = req.session.user._id
          const study_id = req.session.study_id;

          if (!userid || !study_id) {
            console.warn('⚠️ Missing userid/studyid, skipping delete');
          } else {
            await RulerMeasurements.deleteMany({ study_id, user_id: userid });
            console.log('🗑️ All annotations deleted from DB for study', study_id, 'user', userid);
          }
        }
      }

      res.json({ status: 'ok' });
    } catch (err) {
      console.error(`❌ Error in webquizController>handleSessionPost:`, err);
      next(err);
    }
  };
}


//=========================================================
async function saveAnnotationsToDB(annotationObjects, req) {
  // first get user id based on user name
  const username = req.session.user.username;
  const study_id = req.session.study_id;

  if (!username || !study_id) {
    console.error("❌ Missing user or study ID in session");
    return;
  }

  try {
    const existingAnnotation = await RulerMeasurements.findOne({
      user_id: req.session.user._id,
      study_id: req.session.study_id,
    });

    if (existingAnnotation) {
      console.log('✏️ Updating existing annotation document');
      existingAnnotation.data = annotationObjects;
      existingAnnotation.created_at = new Date(); // optional: refresh timestamp
      await existingAnnotation.save();
      console.log('✅ Annotation updated in DB');
    } else {
      console.log('🆕 Creating new annotation document');
      const newAnnotation = new RulerMeasurements({
        user_id: req.session.user._id,
        study_id,
        data: annotationObjects
      });
      await newAnnotation.save();
      console.log('✅ Annotation saved to DB');
    }
  } catch (error) {
      console.error("❌ DB error trying to save annotation objects:", error);
      throw error;
  }
}


//=========================================================
async function saveSegmentationsToDB(segmentationObjects, req) {
  // first get user id based on user name
  const username = req.session.user.username;
  const study_id = req.session.study_id;

  // console.log("*** USER NAME: ", username,  "  STUDY:", study_id, "Seg Objects:", segmentationObjects);
  if (!username || !study_id) {
    console.error("❌ Missing user or study ID in session");
    return;
  }
  try {

    const parent = await Segmentations.findOne({
      user_id: req.session.user._id,
      study_id,
    });

    if (segmentationObjects.length === 0) {
      // no segmentation objects for this study (deleted in frontend)
      if (parent) {
        parent.segmentationIds = [];
        await parent.save();
        console.log('🗑️ All segmentations deleted for this study');
      }
    } else {

      // const incomingSegs = segmentationObjects; // from frontend
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
        console.log('✅ Created new segmentation parent document');
        return;
      }

      // -----------------------------
      // 1. DELETE removed segmentations
      // -----------------------------
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
          // Update existing
          parent.segmentationIds[index] = {
            ...parent.segmentationIds[index],
            ...seg,
            created_at: new Date(),
          };
        } else {
          // Add new
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
      console.log('✅ Segmentation document updated (add/update/delete)');
    }





  } catch (error) {
      console.error("❌ DB error trying to save segmentation objects:", error);
      throw error;
  }
}

//=========================================================
//=========================================================
//===================  HELPERS  ===========================
//=========================================================
//=========================================================



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
// Build auth header — currently unused (Orthanc is open), but wired up ready.
// When you lock down Orthanc, set ORTHANC_USER and ORTHANC_PASS in your env vars.
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
    body: studyInstanceUID,  // plain string, not JSON.stringify([studyInstanceUID])
  });

  if (!response.ok) {
    throw new Error(`Orthanc lookup failed: ${response.status}`);
  }

  const results = await response.json();
  console.log('🔍 Orthanc lookup results:', JSON.stringify(results));

  const studyMatch = results.find(r => r.Type === 'Study');
  if (!studyMatch) {
    throw new Error(`No Orthanc study found for UID: ${studyInstanceUID}`);
  }
  return studyMatch.ID;
}