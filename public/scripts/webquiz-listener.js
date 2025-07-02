console.log("\x1b[32m*******  In listener script\x1b[0m");
console.log("\x1b[32mCurrent path:\x1b[0m", window.location.pathname);
console.log("\x1b[32mIs inside iframe:\x1b[0m", window !== window.parent);

window.addEventListener('message', (event) => {
    console.log('*******  Raw message received in WebQuiz:', event);
});

window.addEventListener('message', (event) => {
  console.log('********** Message listener triggered in webquiz iframe');
  if (event.data.type === 'annotations') {

    const measurements = event.data.measurementdata;
    const segmentations = event.data.segmentationdata;
    console.log('Received measurements:', measurements);
    console.log('Received segmentations:', segmentations);

    const lengths = measurements.flatMap(measurement => {
      const cachedStats = measurement.annotation?.data?.cachedStats || {};
      return Object.values(cachedStats).map(stat => stat.length).filter(Boolean);
    });

    const volumes = segmentations.map(entry => ({
      segmentation: entry.segmentation,
      segment: entry.segment,
      volume: entry.volume
    }));

    console.log('********** Lengths extracted in webquiz_iframe:', lengths); // An array of all lengths across all annotations
    console.log('********** Volumes extracted:', volumes);

    const payload = { lengths, volumes };

  fetch('/webquiz/lengths', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('✅ Server responded with JSON:', data);
      window.parent.postMessage({ type: 'reload-webquiz' }, '*');
    })
    .catch(error => console.error('❌ Error posting lengths:', error));
  }
});

