document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  const music = document.getElementById('bgMusic');
  const containers = document.querySelectorAll('.container');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  // Set volume lower
  music.volume = 0.2;

  // Start bouncing the form and venue containers
  containers.forEach(container => {
    container.classList.add('bouncing');
  });

  // Splash screen click behavior
  splash?.addEventListener('click', () => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 500);

    // Scroll to top to reset position
    window.scrollTo({ top: 0 });

    if (music) {
      music.play().catch(err => {
        console.warn('Music playback blocked:', err);
      });
    }
  });

  // Stop bouncing on first scroll
  let hasScrolled = false;
  window.addEventListener('scroll', () => {
    if (hasScrolled) return;
    hasScrolled = true;

    containers.forEach(container => {
      container.classList.remove('bouncing');
    });

    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      indicator.style.transition = 'opacity 0.5s ease';
      indicator.style.opacity = '0';

      setTimeout(() => indicator.remove(), 600); // wait for fade to finish
    }
  });

  // Slide carousel
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  setInterval(() => {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
});

// Pause music if tab is hidden
document.addEventListener('visibilitychange', () => {
  const music = document.getElementById('bgMusic');
  if (document.hidden) {
    music?.pause();
  } else {
    music?.play().catch(() => {});
  }
});
