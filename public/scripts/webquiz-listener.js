console.log("\x1b[32m*******  In listener script\x1b[0m");
console.log("\x1b[32mCurrent path:\x1b[0m", window.location.pathname);
console.log("\x1b[32mIs inside iframe:\x1b[0m", window !== window.parent);

let received = { lengths: false, volumes: false };

// // for debugging
// window.addEventListener('message', (event) => {
//     console.log('*******  Raw message received in WebQuiz:', event);
// });

window.addEventListener('message', (event) => {
  console.log('\x1b[32m*******  Raw message received in WebQuiz:\x1b[0m"', event);
  if (event.data.type === 'annotations') {
    console.log('\x1b[32m********** In webquiz iframe - handling all annotations\x1b[0m"');

    const measurements = event.data.measurementdata;
    const segmentations = event.data.segmentationdata;
    console.log('Received measurements:', measurements);
    console.log('Received segmentations:', segmentations);

    // const lengths = measurements.flatMap(measurement => {
    //   const cachedStats = measurement.annotation?.data?.cachedStats || {};
    //   return Object.values(cachedStats).map(stat => stat.length).filter(Boolean);
    // });

    const lengths = measurements.flatMap((statsObj) => {
      return Object.values(statsObj)
        .filter((stat) => typeof stat === 'object' && stat !== null && 'length' in stat)
        .map((stat) => stat.length);
    });

    const volumes = segmentations.map(entry => ({
      segmentation: entry.segmentation,
      segment: entry.segment,
      volume: entry.volume
    }));

    console.log('********** Lengths extracted in webquiz_iframe:', lengths); // An array of all lengths across all annotations
    console.log('********** Volumes extracted:', volumes);

    const payload = { lengths, volumes };

    postDataToWebQuiz('lengths', { lengths }).then(() => {
      received.lengths = true;
      maybeReloadIframe();
    });

    postDataToWebQuiz('volumes', { volumes }).then(() => {
      received.volumes = true;
      maybeReloadIframe();
    });
  
 }
});

// dynamic function to return specific fetch for requested 
//    route with associated data
function postDataToWebQuiz(path, payload) {
  return fetch(`/webquiz/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload })
  })
    .then(res => res.json())  // turn response into usable object ('data')
    .then(data => {
      console.log(`✅ Server responded for ${path}:`, data);
      return data; // hand control back to caller
    })
    .catch(error => console.error(`❌ Error posting ${path}:`, error));
}


// Check that all data has been received before reloading
//  the panel. We only want one reload.
function maybeReloadIframe() {
  if (received.lengths && received.volumes) {
    window.parent.postMessage({ type: 'reload-webquiz' }, '*');
    received = { lengths: false, volumes: false };
  }
}

