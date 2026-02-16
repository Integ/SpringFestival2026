// ========== Floating Particles ==========
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#D4A017', '#F2C94C', '#C41E3A', '#E74C3C', '#FF6B35'];
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color;
    particle.style.left = left + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

    container.appendChild(particle);
  }
}

// ========== Navbar Scroll Effect ==========
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ========== Scroll Fade-in Animations ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

// ========== Photo Gallery ==========
const galleryPhotos = [
  { src: 'images/06fe9a4ed3c62dd4f764bc78e4219e0b.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/29c2c5c09bbd8e3518ac87c1a987ddd3.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/36c146e7b5ad1713ff0731050eb179ba.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/38f4f9882cca9d70c9998df016796965.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/39518b68adebfcaf16f5b6190dc1df7a.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/3e36e4f55ef85615bcc8ea67cc18196a.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/520c0eeca9655568915d063ce2851f19.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/53a8a82866c6b572feff9d888887c986.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/579fb3fe685bf4e5bbd4337f1946b849.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/5bb2bec29ef31cbbc3a576576262eb95.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/6261ee0a695052c212ad92bdd2f9a3cb.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/71874fb05237fedd87089413200ac635.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/8fceb0a4aa9e5785860c5c97bb8db2c7.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/C5D36743.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/C5D36746.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/C5D36810.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/C5D36813.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/C5D36919.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/ChatGPT Image Feb 15, 2026 at 09_28_36 PM.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/ChatGPT Image Feb 15, 2026 at 09_34_49 PM.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/ChatGPT Image Feb 15, 2026 at 09_38_38 PM.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/abcbfcdd7c2b9a7e68fded14536d60cd.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/da57265a228bdc4f7ff75d3412108cd9.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/dd1d4d5cbdac49dee5250f61d821f5df.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/ef46035f426b9c943875acb583c0b904.jpg', caption: '春晚精彩瞬间' },
  { src: 'images/fbac02ca1b829169fffa2ceda5f74b17.jpg', caption: '春晚精彩瞬间' }
];

function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  galleryPhotos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-caption">${photo.caption}</div>
      </div>
    `;
    item.addEventListener('click', () => openLightbox(index));
    grid.appendChild(item);
  });
}

// ========== Lightbox ==========
let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = galleryPhotos[index].src;
  img.alt = galleryPhotos[index].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex =
    (currentLightboxIndex + direction + galleryPhotos.length) % galleryPhotos.length;
  const img = document.getElementById('lightboxImg');
  img.src = galleryPhotos[currentLightboxIndex].src;
  img.alt = galleryPhotos[currentLightboxIndex].caption;
}

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });
  document.getElementById('lightboxNext').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

// ========== Smooth Scroll for Nav Links ==========
function initSmoothScroll() {
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavbar();
  buildGallery();
  initLightbox();
  initSmoothScroll();
  initScrollAnimations();
});
