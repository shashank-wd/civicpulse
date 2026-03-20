let currentFilter = 'all';

function filterHistory() {
  const query  = document.getElementById('history-search')?.value.toLowerCase().trim() || '';
  const cards  = document.querySelectorAll('.history-card');
  const empty  = document.getElementById('history-empty');
  let   visible = 0;

  cards.forEach(card => {
    const title  = card.dataset.title?.toLowerCase() || '';
    const status = card.dataset.status || '';

    const matchSearch = !query || title.includes(query);
    const matchFilter = currentFilter === 'all' || status === currentFilter;

    if (matchSearch && matchFilter) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  if (empty) empty.style.display = visible === 0 ? 'flex' : 'none';
}

function setHistoryFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.hfilter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterHistory();
}
