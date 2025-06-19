console.log("*******  In listener script");
console.log("Current path:", window.location.pathname);
console.log("Is inside iframe:", window !== window.parent);

window.addEventListener('message', (event) => {
    console.log('*******  Raw message received in WebQuiz:', event);
});

window.addEventListener('message', (event) => {
  console.log('********** Message listener triggered in webquiz iframe');
  if (event.data.type === 'annotation') {
    console.log('Received annotation:', event.data.annotationdata);

    const annotations = event.data.annotationdata;

    const lengths = annotations.flatMap(annotation => {
      const cachedStats = annotation.annotation.data.cachedStats;
      return Object.values(cachedStats).map(stat => stat.length);
    });

    console.log('********** Lengths extracted in webquiz_iframe:', lengths); // An array of all lengths across all annotations


  fetch('/webquiz', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lengths })
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

