document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const header = document.getElementById('siteHeader');

navToggle.addEventListener('click', () => {
  const isOpen = header.getAttribute('data-open') === 'true';
  header.setAttribute('data-open', String(!isOpen));
  navToggle.setAttribute('aria-expanded', String(!isOpen));
});

document.querySelectorAll('#mainNav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.setAttribute('data-open', 'false');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// Contact form: visual-only submit handling
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.textContent = '✓ Message sent!';
    btn.style.backgroundImage = 'none';
    btn.style.backgroundColor = 'var(--teal)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.backgroundImage = '';
      btn.style.backgroundColor = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
