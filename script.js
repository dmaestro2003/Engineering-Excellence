const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const year = document.getElementById('year');
const chatToggle = document.querySelector('.chat-toggle');
const chatPanel = document.querySelector('.chat-panel');
const chatClose = document.querySelector('.chat-close');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.classList.toggle('active');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal-item, .reveal-group > *');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

if (chatToggle && chatPanel && chatClose) {
  const setChatState = (isOpen) => {
    chatPanel.hidden = !isOpen;
    chatToggle.setAttribute('aria-expanded', String(isOpen));
  };

  chatToggle.addEventListener('click', () => {
    setChatState(chatPanel.hidden);
  });

  chatClose.addEventListener('click', () => setChatState(false));

  chatPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setChatState(false));
  });
}
