console.log("*******  In parent relay script");
console.log("Current path:", window.location.pathname);
console.log("Is in parent:", window == window.parent);

// watch for all events coming in to the parent window
//  reload the webquiz iframe if requested
//  otherwise - repost all other events
window.addEventListener('message', (event) => {
  console.log('*******  Raw message received iframehost parent:', event);
  const quizFrame = document.getElementById('webquiz_iframe');
  if (event.data.type === 'reload-webquiz') {
    console.log("******* In parent - About to reload webquiz iframe");
    if (quizFrame) {
      quizFrame.src = quizFrame.src;  // simple reload
      console.log('🔁 Reloaded webquiz iframe');
    }
  } else {
    quizFrame.contentWindow.postMessage(event.data, '*');
  }
});