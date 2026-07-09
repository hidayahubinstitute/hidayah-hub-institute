// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const navBackdrop = document.getElementById('navBackdrop');

function closeNav(){
  mainNav.classList.remove('is-open');
  navBackdrop.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}
function openNav(){
  mainNav.classList.add('is-open');
  navBackdrop.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
}

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.contains('is-open');
  isOpen ? closeNav() : openNav();
});

navBackdrop.addEventListener('click', closeNav);

// Close mobile nav when a link is clicked
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ============================================================
// FAQ accordion
// ============================================================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all other open items
    document.querySelectorAll('.faq-q').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
  });
});

// ============================================================
// Scroll reveal for sections
// ============================================================
const revealTargets = document.querySelectorAll(
  '.why-card, .course-card, .method-steps li, .about-text, .who-list, .faq-item'
);
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============================================================
// Header shadow on scroll
// ============================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20
    ? '0 4px 20px rgba(42,42,37,0.06)'
    : 'none';
});
