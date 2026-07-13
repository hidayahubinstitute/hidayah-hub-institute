/**
 * Hidayah Hub Institute — Production Frontend Logic
 * Wrapped in an IIFE to prevent global scope pollution.
 */
(function() {
  'use strict';

  // ============================================================
  // 1. Mobile Navigation & Focus Trapping
  // ============================================================
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navBackdrop = document.getElementById('navBackdrop');

  if (navToggle && mainNav && navBackdrop) {
    const closeNav = () => {
      mainNav.classList.remove('is-open');
      navBackdrop.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; // Restore background scroll
    };

    const openNav = () => {
      mainNav.classList.add('is-open');
      navBackdrop.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    navBackdrop.addEventListener('click', closeNav);

    // Close mobile nav when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    // Accessibility: Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  // ============================================================
  // 2. FAQ Accordion (ARIA Compliant)
  // ============================================================
  const faqButtons = document.querySelectorAll('.faq-q');
  
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const controlsId = btn.getAttribute('aria-controls');
      if (!controlsId) return;
      
      const answer = document.getElementById(controlsId);
      if (!answer) return;

      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all other open items
      faqButtons.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswerId = other.getAttribute('aria-controls');
          if (otherAnswerId) {
            const otherAnswer = document.getElementById(otherAnswerId);
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        }
      });

      // Toggle current item
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  // ============================================================
  // 3. Performance-Optimized Scroll Reveal (IntersectionObserver)
  // ============================================================
  const revealTargets = document.querySelectorAll(
    '.why-card, .course-card, .method-steps li, .about-text, .who-list, .faq-item'
  );

  // Fallback for very old browsers, otherwise initialize observer
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(el => el.setAttribute('data-reveal', ''));
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // ============================================================
  // 4. Debounced Header Shadow on Scroll
  // ============================================================
  const header = document.getElementById('header');
  
  if (header) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 20px rgba(42,42,37,0.06)';
          } else {
            header.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true }); // passive flag optimizes scrolling performance
  }

})();
