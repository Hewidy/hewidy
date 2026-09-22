'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

// Original, schematic neural network: illustrative geometry, not a trained model.
const ns = 'http://www.w3.org/2000/svg';
const layers = [3, 5, 5, 2].map((count, layer) => Array.from({ length: count }, (_, i) => ({ x: 45 + layer * 143, y: 180 + (i - (count - 1) / 2) * 60 })));
layers.slice(0, -1).forEach((layer, li) => layer.forEach(a => layers[li + 1].forEach(b => { const line = document.createElementNS(ns, 'line'); Object.entries({ x1:a.x, y1:a.y, x2:b.x, y2:b.y }).forEach(([key, value]) => line.setAttribute(key, value)); document.querySelector('#network-lines').append(line); })));
layers.forEach((layer, li) => layer.forEach((point, i) => { const circle = document.createElementNS(ns, 'circle'); circle.setAttribute('cx', point.x); circle.setAttribute('cy', point.y); circle.setAttribute('r', li === 3 ? 10 : 7); if ((i + li) % 3 === 0) { circle.classList.add('lit'); circle.style.animationDelay = `${li * .4}s`; } document.querySelector('#network-nodes').append(circle); }));

if ('IntersectionObserver' in window) {
  const navLinks = [...navigation.querySelectorAll('a')];
  const sections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { navLinks.forEach(link => { const active = link.hash === '#' + entry.target.id; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-15% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll('.section-heading, .split, .project-card, .skill-grid article, .education-card, .process-grid article, .service-list article').forEach(element => { element.classList.add('reveal'); observer.observe(element); });
  }
}
