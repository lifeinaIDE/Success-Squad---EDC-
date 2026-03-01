// === EDC WEBSITE — main.js ===

// ---- NAV SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Toggle menu
hamburger?.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') && 
      !navLinks.contains(e.target) && 
      e.target !== hamburger) {
    navLinks.classList.remove('open');
    hamburger?.querySelectorAll('span').forEach(s => { 
      s.style.transform = ''; 
      s.style.opacity = ''; 
    });
    document.body.style.overflow = '';
  }
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks?.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger?.querySelectorAll('span').forEach(s => { 
        s.style.transform = ''; 
        s.style.opacity = ''; 
      });
      document.body.style.overflow = '';
    }
  });
});

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ---- INTERSECTION OBSERVER ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Counter
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      // Cards
      entry.target.querySelectorAll('.pillar-card, .team-card').forEach((card, i) => {
        card.style.animationPlayState = 'running';
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.hero-stats, .pillars-grid, .team-grid').forEach(el => {
  observer.observe(el);
});

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ---- PILLAR CARDS: pause animation until visible ----
document.querySelectorAll('.pillar-card').forEach(card => {
  card.style.animationPlayState = 'paused';
});

const pillarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.pillar-card').forEach(card => {
        card.style.animationPlayState = 'running';
      });
      pillarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const pillarSection = document.querySelector('.pillars-grid');
if (pillarSection) pillarObserver.observe(pillarSection);

// ---- SMOOTH REVEAL ON SCROLL ----
const revealEls = document.querySelectorAll('.event-row, .cta-strip h2, .cta-strip p');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});
