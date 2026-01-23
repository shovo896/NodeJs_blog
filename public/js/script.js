const searchBar = document.querySelector('.searchBar');
const searchBtn = document.querySelector('.searchBtn');
const searchClose = document.querySelector('.searchClose');
const searchInput = document.querySelector('#searchInput');

const openSearch = () => {
  if (!searchBar) return;
  searchBar.classList.add('open');
  searchBtn?.setAttribute('aria-expanded', 'true');
  searchInput?.focus();
};

const closeSearch = () => {
  if (!searchBar) return;
  searchBar.classList.remove('open');
  searchBtn?.setAttribute('aria-expanded', 'false');
};

searchBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  openSearch();
});

searchClose?.addEventListener('click', closeSearch);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSearch();
  }
});
