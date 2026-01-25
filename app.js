const searchInput = document.querySelector('#search-input');
const matchCount = document.querySelector('#match-count');
const cards = Array.from(document.querySelectorAll('.card'));
const categories = Array.from(document.querySelectorAll('.category'));

const updateMatches = (query) => {
  const normalized = query.trim().toLowerCase();
  let visibleCards = 0;

  cards.forEach((card) => {
    const haystack = `${card.textContent} ${card.dataset.search}`.toLowerCase();
    const isMatch = normalized === '' || haystack.includes(normalized);
    card.hidden = !isMatch;
    if (isMatch) visibleCards += 1;
  });

  categories.forEach((section) => {
    const visibleInSection = section.querySelectorAll('.card:not([hidden])');
    section.hidden = visibleInSection.length === 0;
  });

  if (!normalized) {
    matchCount.textContent = 'All concepts';
  } else {
    matchCount.textContent = `${visibleCards} match${visibleCards === 1 ? '' : 'es'}`;
  }
};

searchInput.addEventListener('input', (event) => {
  updateMatches(event.target.value);
});

updateMatches('');
