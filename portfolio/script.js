// Scroll reveal animations for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Typing effect for cover tagline
const tagline = document.querySelector('.tagline');
const taglineText = "Mechanical Engineer";
let index = 0;
let isDeleting = false;

function typeEffectLoop() {
  if (!tagline) return;

  if (isDeleting) {
    tagline.textContent = taglineText.substring(0, index--);
  } else {
    tagline.textContent = taglineText.substring(0, index++);
  }

  if (index === taglineText.length + 1) {
    isDeleting = true;
    setTimeout(typeEffectLoop, 1000); // pause before deleting
  } else if (index === 0) {
    isDeleting = false;
    setTimeout(typeEffectLoop, 400); // pause before retyping
  } else {
    setTimeout(typeEffectLoop, isDeleting ? 30 : 60);
  }
}

window.addEventListener('load', () => {
  if (tagline) {
    tagline.textContent = '';
    typeEffectLoop();

    gsap.from('.cover-content', {
      duration: 1.5,
      y: -40,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.3
    });
  }
});


// Back to Top Button logic
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
  }
});

// Load animations and effects
window.addEventListener('load', () => {
  if (tagline) {
    tagline.textContent = '';
    typeEffect();

    gsap.from('.cover-content', {
      duration: 1.5,
      y: -40,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.3
    });
  }
});

// Particle canvas background
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#8883';
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

initParticles();
animateParticles();

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active-nav');
    }
  });
});

