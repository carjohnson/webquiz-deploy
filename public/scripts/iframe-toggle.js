// add script for collapsing the webquiz panel with the toggle btn
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const webquizIframe = document.getElementById('webquiz_iframe');

  if (toggleBtn && webquizIframe) {
    toggleBtn.addEventListener('click', () => {
      webquizIframe.classList.toggle('collapsed');
      toggleBtn.textContent = webquizIframe.classList.contains('collapsed')
        ? '>'
        : '<';
    });
  }
});