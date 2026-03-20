// ── Category Selection ────────────────────────
function selectCat(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Photo Upload / Preview ────────────────────
function triggerUpload() {
  const zone = document.getElementById('upload-zone');
  const preview = document.getElementById('photo-preview');
  if (!zone || !preview) return;
  zone.style.display = 'none';
  preview.classList.add('visible');
}

function removePhoto() {
  const zone = document.getElementById('upload-zone');
  const preview = document.getElementById('photo-preview');
  if (!zone || !preview) return;
  zone.style.display = '';
  preview.classList.remove('visible');
}

// ── Submit Report ─────────────────────────────
function submitReport() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 4000);
}

// ── Dashboard: Assign Issue ───────────────────
function assignIssue(btn) {
  if (btn.classList.contains('assigned')) return;
  btn.classList.add('assigned');
  btn.textContent = 'Assigned';
  const row = btn.closest('.table-row');
  if (row) {
    setTimeout(() => {
      row.style.opacity = '0.5';
    }, 600);
  }
}

// ── Dashboard: Filter Issues ──────────────────
function filterIssues(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.table-row').forEach(row => {
    if (cat === 'all' || row.dataset.cat === cat) {
      row.classList.remove('hidden');
    } else {
      row.classList.add('hidden');
    }
  });
}

// ── Scorecard: Ward Data ──────────────────────
const wardData = {
  "42": { total: 148, resolved: 129, rate: "87%", avg: "4.2d", pending: 19 },
  "17": { total: 203, resolved: 148, rate: "73%", avg: "6.8d", pending: 55 },
  "8":  { total: 112, resolved: 105, rate: "94%", avg: "2.9d", pending: 7  },
  "31": { total: 177, resolved: 108, rate: "61%", avg: "9.1d", pending: 69 },
  "55": { total: 234, resolved: 103, rate: "44%", avg: "14.3d", pending: 131 }
};

function loadWard(wardId) {
  const d = wardData[wardId];
  if (!d) return;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('m-total',    d.total);
  set('m-resolved', d.resolved);
  set('m-rate',     d.rate);
  set('m-avg',      d.avg);
  set('m-pending',  d.pending);

  const rate = parseInt(d.rate);
  const rateEl = document.getElementById('m-rate');
  if (rateEl) {
    rateEl.className = 'metric-big';
    if (rate >= 80) rateEl.classList.add('success');
    else if (rate >= 60) rateEl.classList.add('warning');
    else rateEl.classList.add('critical');
  }

  const pendingEl = document.getElementById('m-pending');
  if (pendingEl) {
    pendingEl.className = 'metric-big';
    if (d.pending > 50) pendingEl.classList.add('critical');
    else if (d.pending > 20) pendingEl.classList.add('warning');
  }

  document.querySelectorAll('.rank-row').forEach(row => {
    row.classList.toggle('active-row', row.dataset.ward === wardId);
  });
}

// ── Rank Row Click ────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.rank-row').forEach(row => {
    row.addEventListener('click', () => {
      const wardId = row.dataset.ward;
      const sel = document.getElementById('ward-select');
      if (sel) sel.value = wardId;
      loadWard(wardId);
    });
  });
});
