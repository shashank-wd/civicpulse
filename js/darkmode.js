// ── Dark Mode ─────────────────────────────────
// Applies dark class on load if saved, syncs toggle UI

(function () {
  const saved = localStorage.getItem('civicpulse_dark');
  if (saved === 'true') document.body.classList.add('dark');
})();

function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('civicpulse_dark', isDark);
  syncToggleUI();
}

function syncToggleUI() {
  const track = document.getElementById('dark-track');
  if (!track) return;
  if (document.body.classList.contains('dark')) {
    track.classList.add('on');
  } else {
    track.classList.remove('on');
  }
}

// Sync on page load after DOM ready
document.addEventListener('DOMContentLoaded', syncToggleUI);
