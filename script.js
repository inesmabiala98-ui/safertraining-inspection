// SAFER TRAINING & INSPECTION — script.js

document.addEventListener('DOMContentLoaded', () => {
  // Année dans le footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Lecture automatique de la vidéo de fond du hero (filet de sécurité si
  // l'attribut autoplay seul est ignoré par le navigateur)
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const tryPlay = () => {
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const resume = () => {
            heroVideo.play();
            document.removeEventListener('click', resume);
            document.removeEventListener('touchstart', resume);
          };
          document.addEventListener('click', resume, { once: true });
          document.addEventListener('touchstart', resume, { once: true });
        });
      }
    };
    if (heroVideo.readyState >= 2) {
      tryPlay();
    } else {
      heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
    }
  }

  // Menu mobile
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-open');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => menu.classList.remove('is-open'));
    });
  }

  // Animation d'apparition au défilement
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Formulaire de contact (démo — sans envoi serveur)
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMessage.textContent = 'Merci, votre demande a bien été enregistrée. Nous vous recontacterons rapidement.';
      formMessage.style.color = '#f59300';
      form.reset();
    });
  }
});
