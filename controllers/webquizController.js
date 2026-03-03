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
  const study = await Study.findOne({ studyUID });
  const study_id = study._id;
  const user = await User.findOne({username})
  const user_id = user._id;

  if (!sessionUser) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  if (!study_id) {
    return res.status(400).json({ error: 'Missing study ID in session' });
  }

  try {

    let segmentationsList = [];


      const userStudySegmentations = await Segmentations.find({
        user_id,
        study_id,
      });

  for (const segDoc of userStudySegmentations) {
    for (const entry of segDoc.segmentationIds) {

      // Collect segmentation-level label
      const segmentationLabel = entry.label;

      // Collect segment-level labels
      const segmentLabels = entry.segments.map(seg => ({
        segmentIndex: seg.segmentIndex,
        label: seg.label,
        cachedStats: seg.cachedStats,
      }));

      // Load SEG binary
      let base64Buffer = null;
      if (entry.segmentationDataRef) {
        try {
          const fileBuffer = await safeReadFile(entry.segmentationDataRef);
          if (fileBuffer) {
            base64Buffer = fileBuffer.toString("base64");
          }
        } catch (err) {
          console.error("❌ Failed to read SEG file:", entry.segmentationDataRef, err);
        }
      }

      // Push one clean payload entry
      segmentationsList.push({
        segmentationId: entry.segmentationId,
        referencedSeriesUID: entry.sourceSeriesInstanceUid,
        segmentationLabel,
        segmentLabels,
        base64Buffer,
      });
    }
  }


    // console.log('🧮 Segmentations list', segmentationsList);
    res.json({ type: 'list-study-segmentations', payload: segmentationsList });

  } catch (err) {
    console.error('❌ Error retrieving segmentations:', err);
    next(err);
  }
  
});
//=========================================================
exports.post_segmentationObjects = async (req, res) => {
    // >>>>>  Segmentation objects - blob data  <<<<<<<<<<<<<<<<<<<<<<<<<<<
    console.log('📥 Incoming POST for Segmentation ... length:', Object.keys(req.body).length  );
    if (Object.keys(req.body).length > 0) {
      // console.log('✅ Saving segmentations:', req.body);
      console.log('✅ Saving segmentations:');
      const segmentations = [];
      const username = req.session.user.username;
      const study_id = req.session.study_id;

      // Reconstruct array from segObj_X_metadata + blobs (add files check later)
      for (const field of Object.keys(req.body)) {
        if (field.endsWith('_metadata')) {

          const match = field.match(/segObj_(\d+)_metadata/);
          if (!match) return;
          
          const index = parseInt(match[1]);
          const metadata = JSON.parse(req.body[field]);
          
          // ✅ Now safely find matching blob
          const blobFile = req.files?.find(f => 
            f.fieldname === `segObj_${index}_blob`
          );
          
          if (blobFile) {
            // Generate safe filename
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
          console.warn(`⚠️ No blob found for segObj_${index}_blob`);
        }
          segmentations[index] = metadata;
        }
      }  // end for loop

      const validSegs = segmentations.filter(Boolean);
      console.log('✅ Reconstructed:', validSegs);
      
      await saveSegmentationsToDB(validSegs, req);
      res.json({ success: true, count: validSegs.length });
      return;
    } else {
      // last segmentation was deleted - remove from DB and file storage
      const userid = req.session.user._id;
      const study_id = req.session.study_id;
      if (!userid || !study_id) {
        console.warn('⚠️ Missing userid/studyid, skipping delete');
      } else {
        // get references to seg files stored - for deletion
        const existingSegmentations = await Segmentations.findOne({
          user_id: req.session.user._id,
          study_id,
        });
                if (existingSegmentations) {
          for (const segId of existingSegmentations.segmentationIds) {
            if (segId.segmentationDataRef) {
              try {
                await fs.unlink(segId.segmentationDataRef);
                console.log('🗑️ Deleted file:', segId.segmentationDataRef);
              } catch (err) {
                console.warn('⚠️ Failed to delete file:', segId.segmentationDataRef, err);
              }
            }
          } // end for each segId

          await Segmentations.deleteMany({ study_id, user_id: userid });
          console.log('🗑️ All segmentations deleted from DB for study', study_id, 'user', userid);
        }
      }
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

    // for (const seg of segmentationObjects) {
    //   const {
    //     segmentationId,
    //     sourceSeriesInstanceUid,
    //     label,
    //     segments,
    //     segmentationDataRef,
    //   } = seg;

    //   const parent = await Segmentations.findOne({
    //     user_id: req.session.user._id,
    //     study_id,
    //   });

    //   if (parent) {
    //     console.log('✏️ Updating existing segmentations document');

    //     const index = parent.segmentationIds.findIndex(
    //       s => s.segmentationId === segmentationId
    //     );
    //     if (index !== -1) {
    //       parent.segmentationIds[index].label = label;
    //       parent.segmentationIds[index].segments = segments;
    //       parent.segmentationIds[index].sourceSeriesInstanceUid = sourceSeriesInstanceUid;
    //       parent.segmentationIds[index].segmentationDataRef = segmentationDataRef;
    //       parent.segmentationIds[index].created_at = new Date(); 
        
    //     } else {
    //       console.log('➕ Adding new segmentation entry');

    //       parent.segmentationIds.push({
    //         segmentationId,
    //         sourceSeriesInstanceUid,
    //         label,
    //         segments,
    //         segmentationDataRef,
    //         created_at: new Date(),
    //       });
    //     }

    //     await parent.save();
    //     console.log('✅ Parent segmentation document updated in DB');

    //   } else {
    //     const newParent = new Segmentations({
    //       user_id: req.session.user._id,
    //       study_id,
    //       segmentationIds: [
    //         {
    //           segmentationId,
    //           sourceSeriesInstanceUid,
    //           label,
    //           segments,
    //           segmentationDataRef,
    //           created_at: new Date(),
    //         }
    //       ],
    //     });

    //     await newParent.save();
    //     console.log('✅ New parent segmentation document saved to DB');
    //   }
    // } // for each segmentation object


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

      const incomingSegs = segmentationObjects; // from frontend
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
