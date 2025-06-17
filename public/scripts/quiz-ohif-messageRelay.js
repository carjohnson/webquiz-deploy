console.log("*******  In parent relay script");
console.log("Current path:", window.location.pathname);
console.log("Is in parent:", window == window.parent);

window.addEventListener('message', (event) => {
    console.log('*******  Raw message received quiz-ohif parent:', event);
    const quizFrame = document.getElementById('webquiz_iframe');
    quizFrame.contentWindow.postMessage(event.data, '*');
});