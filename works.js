document.addEventListener('DOMContentLoaded', () => {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const grid = document.querySelector('.report-grid');
  const cards = [...document.querySelectorAll('[data-category]')];
  const applyFilter = (filter) => {
    const sorted = [...cards].sort((a, b) => (b.dataset.updated || '').localeCompare(a.dataset.updated || ''));
    sorted.forEach((card) => grid?.appendChild(card));
    const visible = sorted.filter((card) => filter === 'all' || card.dataset.category === filter);
    cards.forEach((card) => {
      card.hidden = !visible.includes(card);
      card.classList.remove('report-card-wide');
    });
    visible[0]?.classList.add('report-card-wide');
  };
  buttons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    applyFilter(filter);
  }));
  applyFilter('all');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('is-open', !open); });
});
