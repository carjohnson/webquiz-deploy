console.log("\x1b[32m*******  In listener script\x1b[0m");
console.log("\x1b[32mCurrent path:\x1b[0m", window.location.pathname);
console.log("\x1b[32mIs inside iframe:\x1b[0m", window !== window.parent);

let received = { 
  annotationObjects: false,
  studyid: false,
  legend: false,
  segmentationObjects: false,
};


window.addEventListener('message', async (event) => {
  console.log('\x1b[32m*******  Raw message received in listener:\x1b[0m"', event);


  if (event.data?.type === 'annotations') {
    console.log('\x1b[32m********** In listener webquiz iframe - handling all annotations\x1b[0m"', event.data);


    const annotationObjects = event.data.annotationObjects;
    const studyuid = event.data.studyUID;


    // post these data in series so that studyid gets saved before the annotationObjects which uses it
    postAndTrack('studyid', { studyuid })
      .then(() => postAndTrack('annotationObjects', { annotationObjects }))
      .then(() => {
        maybeReloadIframe();
        setTimeout(() => {
          // fetch("/webquiz/clear-session", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" }
          // });
          postAndTrack('clear-session', {});
        }, 1000);
      });

  }

  if (event.data?.type === 'segmentations') {
    console.log('\x1b[32m********** In listener webquiz iframe - handling all segmentations\x1b[0m"', event.data);
    const segmentationObjects = event.data.segmentationObjects;
    const studyuid = event.data.studyUID;

    postAndTrack('studyid', { studyuid })
      .then(() => postAndTrack('segmentationObjects', { segmentationObjects }))
      .then(() => {
        // maybeReloadIframe();  needs parameter for annotation or segmentation
        setTimeout(() => {
          // fetch("/webquiz/clear-session", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" }
          // });
          postAndTrack('clear-session', {});
        }, 1000);
      });
  }

  if (event.data?.type === 'update-legend') {
    const legend = event.data.legend;
    postAndTrack('legend', { legend })
    .then(() => {
      window.parent.postMessage({ type: 'reload-webquiz' }, '*');
      setTimeout(() => {
        // fetch("/webquiz/clear-session", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" }
        // });
        postAndTrack('clear-session', {});
      }, 1000);
    });
  }


  function postAndTrack(key, data) {
    return postDataToWebQuizBackend(key, data).then(() => {
      received[key] = true;
      console.log('In listener   Key: ', key, ' Bool: ', received[key]);
    });
  }

// dynamic function to return specific fetch for requested 
//    route with associated data
function postDataToWebQuizBackend(path, payload) {
  // console.log('📤 In listener - Posting to backend:', path, payload); // for debug

  // use formData to handle either blobs or JSON-only payloads
  const formData = new FormData();
  // formData.append('payload', JSON.stringify(payload));

  if (path === 'segmentationObjects' && payload.segmentationObjects) {
    // blob with metadata
    payload.segmentationObjects.forEach((segObj, index) => {
      formData.append(`segObj_${index}_metadata`, JSON.stringify(segObj));  // Metadata without Blob
      
      if (segObj.segmentationDataRef && segObj.segmentationDataRef instanceof Blob) {
        formData.append(`segObj_${index}_blob`, segObj.segmentationDataRef, 'segmentation.blob');
      }
    });
  } else {
    // JSON-only
    // console.log(' *** ========= IN LISTENER ... payload', payload);
    // console.log(' *** ========= PAYLOAD LEGEND[0]', payload.legend[0]); // Inspect first item
    
    const jsonString = JSON.stringify(payload);
    // console.log(' *** ========= JSON STRING', jsonString); // See exact serialized data
    
    formData.append('payload', jsonString);
    
    // // ✅ INSPECT FormData entries RIGHT HERE
    // console.log(' *** ========= FORMDATA CONTENTS:');
    // for (let [key, value] of formData.entries()) {
    //   console.log('   ', key, '→', value);
    // }
  }

  // ////////////  FOR DEBUG  ////////////////
  console.log('🔍 In listener - SENDING FormData for', path);
  for (let [key, value] of formData.entries()) {
    console.log(`  📦 ${key} =`, value);
  }
  // console.log('🔍 In listener - FormData size:', formData.entries().next().done ? 0 : 'HAS DATA');


  return fetch(`/webquiz/${path}`, {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({payload}) 
    body: formData, 
  })
    .then(async res => {
      const text = await res.text(); // read raw response
      try {
        const data = JSON.parse(text);
        // console.log(`✅ In listener - Server responded for ${path}`, data);
        return data;
      } catch (err) {
        console.error(`❌ In listener - Response was not JSON for ${path}:`, text);
        throw err;
      }
    })
    .catch(error => console.error(`❌ In listener - Error posting ${path}:`, error));
}


// Check that all data has been received before reloading
//  the panel. We only want one reload.
function maybeReloadIframe() {
  console.log('*** In listener - Request to reload. Received props:', received);
  if (received.annotationObjects && received.studyid) {
    window.parent.postMessage({ type: 'reload-webquiz' }, '*');
    received = { annotationObjects: false, studyid: false };
  }
}

});