const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

const normalizeAssetValue = (value) => {
  if (typeof value !== 'string') return value;
  let normalized = value.trim();
  if (normalized.startsWith('stackbit_asset_id:static:')) {
    normalized = normalized.slice('stackbit_asset_id:'.length);
  }
  if (normalized.startsWith('static:')) normalized = normalized.slice('static:'.length);
  if (normalized.startsWith('./')) normalized = normalized.slice(2);
  if (!normalized || /^(https?:|data:|blob:|\/)/i.test(normalized)) return normalized;
  return `/${normalized}`;
};

fetch('/content/pages/home.json')
  .then((response) => response.ok ? response.json() : null)
  .then((content) => {
    if (!content) return;
    document.querySelectorAll('[data-sb-field-path]').forEach((element) => {
      const field = element.dataset.sbFieldPath;
      const value = content[field];
      if (typeof value !== 'string' || element.matches('label')) return;
      if (element.matches('img')) {
        element.src = normalizeAssetValue(value);
        return;
      }
      if (element.matches('video')) {
        const source = element.querySelector('source');
        if (source) {
          source.src = normalizeAssetValue(value);
          element.load();
        }
        return;
      }
      if (field === 'title' || !element.querySelector('input, textarea')) element.textContent = value;
    });
  })
  .catch(() => {});

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
    menuToggle.textContent = isOpen ? 'メニュー' : '閉じる';
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
      menuToggle.textContent = 'メニュー';
    });
  });
}
