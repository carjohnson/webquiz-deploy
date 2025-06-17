console.log("*******  In listener script");
console.log("Current path:", window.location.pathname);
console.log("Is inside iframe:", window !== window.parent);

window.addEventListener('message', (event) => {
    console.log('*******  Raw message received in WebQuiz:', event);
});

window.addEventListener('message', (event) => {
  console.log('Message listener triggered');
  if (event.data.type === 'annotation') {
    console.log('Received annotation:', event.data.annotationdata);
    // You can also trigger a UI update, save to state, etc.
  }
});