document.addEventListener('DOMContentLoaded', () => {
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    cards.forEach((card) => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('is-open', !open); });
});
