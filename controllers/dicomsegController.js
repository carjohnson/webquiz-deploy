// const dcmjsBuild = require('dcmjs/build/dcmjs');
// const { DicomMetaDictionary, DicomMessage } = require('dcmjs/build/dcmjs');
const dcmjs = require('dcmjs');

const { DicomMessage, DicomMetaDictionary } = dcmjs.data;

///////// for debug ///////////
// console.log("🔍 dcmjs type:", typeof dcmjs);
// console.log("🔍 dcmjs keys:", Object.keys(dcmjs));
///////////////////////////////


exports.uploadSegmentation = async (req, res) => {
  try {
    ///////// for debug ///////////
    // console.log("📡 Incoming SEG upload hit controller.");
    // console.log("Header filename:", req.headers['x-filename']);
    // console.log("🧠 Buffer size:", req.body.length, "bytes");
    // console.log("🔍 First few bytes:", req.body.slice(128, 132).toString());
    ///////////////////////////////

    if (!req.body || !(req.body instanceof Buffer)) {
        console.error("❌ No valid Buffer in req.body.");
        return res.status(400).send("No DICOM data received");
    }

    // Parse the binary data using dcmjs

    const arrayBuffer = req.body.buffer.slice(
      req.body.byteOffset,
      req.body.byteOffset + req.body.byteLength
    );
    const dicomData = DicomMessage.readFile(arrayBuffer);
    // console.log("✅ Got dicomData:", typeof dicomData);

    const dataset = DicomMetaDictionary.naturalizeDataset(dicomData.dict);
    dataset._meta = DicomMetaDictionary.namifyDataset(dicomData.meta);

    // Grab some metadata to confirm
    const modality = dataset.Modality;
    const segLabels = dataset.SegmentSequence?.map(s => s.SegmentLabel);
    const seriesUID = dataset.SeriesInstanceUID;

    console.log("📦 Segmentation Received:");
    console.log("🧬 Modality:", modality);
    console.log("🏷️ Segment Labels:", segLabels);
    console.log("🆔 Series UID:", seriesUID);

    // save to session so that webquizController can access the data for view
    req.session.dicomMeta = {
      modality,
      labels: segLabels,
      seriesUID
    };

    // Respond to client or route to view
    res.json({
      status: "ok",
      modality,
      labels: segLabels,
      seriesUID
    });

  } catch (error) {
    console.error("❌ DICOM parsing error:", error);
    res.status(500).json({ error: "Failed to parse segmentation data." });
  }
};



