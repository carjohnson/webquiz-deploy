// add script for collapsing the webquiz panel with the toggle btn

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const webquizIframe = document.getElementById('webquiz_iframe');
  const ohifIframe = document.getElementById('ohif_iframe');

  if (toggleBtn && webquizIframe) {
    toggleBtn.textContent = webquizIframe.classList.contains('collapsed')
      ? '▶' : '◀';

    toggleBtn.addEventListener('click', () => {
      webquizIframe.classList.toggle('collapsed');
      toggleBtn.textContent = webquizIframe.classList.contains('collapsed')
        ? '▶' : '◀';

      // Continuously dispatch resize events during the 0.3s CSS transition
      // so OHIF recalculates right-panel boundaries dynamically
      const duration = 300;
      const interval = 30;
      let elapsed = 0;

      const timer = setInterval(() => {
        if (ohifIframe && ohifIframe.contentWindow) {
          ohifIframe.contentWindow.dispatchEvent(new Event('resize'));
        }
        elapsed += interval;
        if (elapsed >= duration) {
          clearInterval(timer);
        }
      }, interval);
    });
  }
});