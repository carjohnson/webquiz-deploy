// public/scripts/webquiz-listener.js
console.log("\x1b[32m*******  In listener script\x1b[0m");
console.log("\x1b[32mCurrent path:\x1b[0m", window.location.pathname);
console.log("\x1b[32mIs inside iframe:\x1b[0m", window !== window.parent);

let received = {
  annotationObjects: false,
  studyid: false,
  legend: false,
  segmentationObjects: false,
};

// ---------------------------------------------------------------------
// Error popup: shown whenever a POST to the webquiz backend fails
// (e.g. MongoDB unreachable, 500 errors, network failure).
// ---------------------------------------------------------------------
function showBackendErrorPopup(message) {
  // Avoid stacking multiple popups if several requests fail at once
  if (document.getElementById('webquiz-backend-error-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'webquiz-backend-error-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  `;

  const box = document.createElement('div');
  box.style.cssText = `
    background: #fff;
    max-width: 420px;
    width: 90%;
    border-radius: 8px;
    padding: 24px 28px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    border-top: 6px solid #d32f2f;
  `;

  box.innerHTML = `
    <h2 style="margin:0 0 12px; font-size:18px; color:#d32f2f;">
      &#9888; Connection Error
    </h2>
    <p style="margin:0 0 12px; font-size:14px; line-height:1.5; color:#222;">
      We couldn't save your work because the server could not be reached.
    </p>
    <p style="margin:0 0 16px; font-size:14px; line-height:1.5; color:#222;">
      <strong>Please stop working and contact your administrator.</strong>
      Any changes made from this point may not be saved.
    </p>
    <p style="margin:0 0 16px; font-size:12px; color:#777; word-break:break-word;">
      Details: ${message}
    </p>
    <div style="text-align:right;">
      <button id="webquiz-backend-error-dismiss" style="
        background:#d32f2f;
        color:#fff;
        border:none;
        border-radius:4px;
        padding:8px 16px;
        font-size:14px;
        cursor:pointer;
      ">OK</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById('webquiz-backend-error-dismiss').addEventListener('click', () => {
    overlay.remove();
  });
}

window.addEventListener('message', async (event) => {
  console.log('\x1b[32m*******  Raw message received in listener:\x1b[0m"', event);


  if (event.data?.type === 'backend-error') {
    // Sent directly by frontend code inside the iframe (e.g.
    // fetchAnnotations.ts, studyHandlers.ts) when one of its own direct
    // fetch calls to the backend fails with a 5xx or network error -
    // those calls aren't relayed through this listener, so they notify
    // us this way instead. Reuses the same popup as the postAndTrack
    // failures below.
    console.error('\x1b[31m❌ In listener - backend-error from iframe:\x1b[0m', event.data.message);
    showBackendErrorPopup(event.data.message || 'Unknown error');
  }

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
          postAndTrack('clear-session', {});
        }, 1000);
      })
      .catch(err => {
        console.error('\x1b[31m❌ In listener - Failed to save annotations:\x1b[0m', err);
        showBackendErrorPopup(err.message || String(err));
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
          postAndTrack('clear-session', {});
        }, 1000);
      })
      .catch(err => {
        console.error('\x1b[31m❌ In listener - Failed to save segmentations:\x1b[0m', err);
        showBackendErrorPopup(err.message || String(err));
      });
  }

  if (event.data?.type === 'update-legend') {
    const legend = event.data.legend;
    postAndTrack('legend', { legend })
      .then(() => {
        window.parent.postMessage({ type: 'reload-webquiz' }, '*');
        setTimeout(() => {
          postAndTrack('clear-session', {});
        }, 1000);
      })
      .catch(err => {
        console.error('\x1b[31m❌ In listener - Failed to save legend:\x1b[0m', err);
        showBackendErrorPopup(err.message || String(err));
      });
  }


  function postAndTrack(key, data) {
    return postDataToWebQuizBackend(key, data).then((result) => {
      received[key] = true;
      console.log('In listener   Key: ', key, ' Bool: ', received[key]);
      return result;
    });
    // NOTE: no .catch() here - failures must propagate up to the
    // caller's .catch() so postAndTrack() is never marked "true"
    // for a request that actually failed.
  }

// dynamic function to return specific fetch for requested
//    route with associated data
function postDataToWebQuizBackend(path, payload) {
  // console.log('📤 In listener - Posting to backend:', path, payload); // for debug

  // use formData to handle either blobs or JSON-only payloads
  const formData = new FormData();

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
    const jsonString = JSON.stringify(payload);
    formData.append('payload', jsonString);
  }

  return fetch(`/webquiz/${path}`, {
    method: 'POST',
    body: formData,
  })
    .then(async res => {
      const text = await res.text(); // read raw response

      // A non-2xx status (e.g. 500 from MongoDB being unreachable)
      // must be treated as a failure, not silently continued.
      if (!res.ok) {
        console.error(`❌ In listener - Server error for ${path}: ${res.status} ${res.statusText}`, text);
        throw new Error(`Server error (${res.status}) while posting to /webquiz/${path}`);
      }

      try {
        const data = JSON.parse(text);
        return data;
      } catch (err) {
        console.error(`❌ In listener - Response was not JSON for ${path}:`, text);
        throw new Error(`Invalid response from server while posting to /webquiz/${path}`);
      }
    })
    .catch(error => {
      // Log it, then RE-THROW so callers (postAndTrack -> the
      // event handlers above) see the failure and can show the popup.
      console.error(`❌ In listener - Error posting ${path}:`, error);
      throw error;
    });
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