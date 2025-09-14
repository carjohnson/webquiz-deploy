console.log("*******  In parent relay script");
console.log("Current path:", window.location.pathname);
console.log("Is in parent:", window == window.parent);

// watch for all events coming in to the parent window
//  reload the webquiz iframe if requested
//  otherwise - repost all other events
window.addEventListener('message', (event) => {
  console.log('******* Parent --- Raw message received :', event);
  const quizFrame = document.getElementById('webquiz_iframe');
  const viewerFrame = document.getElementById('ohif_iframe');

  if (event.data.type === 'reload-webquiz') {
    console.log("******* In parent - About to reload webquiz iframe");
    if (quizFrame) {
      quizFrame.src = quizFrame.src;  // simple reload
      console.log('🔁 Reloaded webquiz iframe');
    }
  } else if (event.data.type === 'request-user-info') {
    // Fetch user info from session or global state
    const userInfo = window.loggedInUser || {}; 
    if (viewerFrame && window.loggedInUser) {
      viewerFrame.contentWindow.postMessage({
        type: 'user-info',
        payload: userInfo
      }, '*');
      console.log('📨 Parent --- Sent user info to viewer iframe: ', userInfo);
    }
  } else {
    quizFrame.contentWindow.postMessage(event.data, '*');
  }
});


window.addEventListener('DOMContentLoaded', () => {
  fetch('/users/session-info', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(user => {
      window.loggedInUser = user;
      console.log('✅ Parent --- Logged-in user info :', user);
    })
    .catch(err => {
      console.error('❌ Failed to fetch user info:', err);
    });
});
