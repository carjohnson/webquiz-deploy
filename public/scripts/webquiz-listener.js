console.log("\x1b[32m*******  In listener script\x1b[0m");
console.log("\x1b[32mCurrent path:\x1b[0m", window.location.pathname);
console.log("\x1b[32mIs inside iframe:\x1b[0m", window !== window.parent);

let received = { annotationObjects: false, patientid: false, legend: false };


window.addEventListener('message', async (event) => {
  console.log('\x1b[32m*******  Raw message received in WebQuiz:\x1b[0m"', event);


  if (event.data?.type === 'annotations') {
    console.log('\x1b[32m********** In webquiz iframe - handling all annotations\x1b[0m"', event.data);


    const annotationObjects = event.data.annotationObjects;
    const patientid = event.data.patientid;
    const studyuid = event.data.studyUID;


    // post these data in series so that patientid studyid gets saved before the annotationObjects which uses it
    postAndTrack('patientid', { patientid })
      .then(() => postAndTrack('studyid', { studyuid }))
      .then(() => postAndTrack('annotationObjects', { annotationObjects }))
      .then(() => {
        maybeReloadIframe();
        setTimeout(() => {
          fetch("/webquiz/clear-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
        }, 1000);
      });

  }

  if (event.data?.type === 'update-legend') {
    const legend = event.data.legend;
    postAndTrack('legend', { legend })
    .then(() => {
      window.parent.postMessage({ type: 'reload-webquiz' }, '*');
      setTimeout(() => {
        fetch("/webquiz/clear-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
      }, 1000);
    });
  }


  function postAndTrack(key, data) {
    return postDataToWebQuiz(key, data).then(() => {
      received[key] = true;
      console.log('Key: ', key, ' Bool: ', received[key]);
    });
  }

// dynamic function to return specific fetch for requested 
//    route with associated data
function postDataToWebQuiz(path, payload) {
  console.log('📤 Posting to backend:', path, payload); // for debug

  return fetch(`/webquiz/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({payload})  
  })
    .then(async res => {
      const text = await res.text(); // read raw response
      try {
        const data = JSON.parse(text);
        console.log(`✅ Server responded for ${path}`, data);
        return data;
      } catch (err) {
        console.error(`❌ Response was not JSON for ${path}:`, text);
        throw err;
      }
    })
    .catch(error => console.error(`❌ Error posting ${path}:`, error));
}


// Check that all data has been received before reloading
//  the panel. We only want one reload.
function maybeReloadIframe() {
  console.log('*** In request to reload. Received props:', received);
  if (received.annotationObjects && received.patientid) {
    window.parent.postMessage({ type: 'reload-webquiz' }, '*');
    received = { annotationObjects: false, patientid: false };
  }
}

});