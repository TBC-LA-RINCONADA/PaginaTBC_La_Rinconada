// Highlight active navigation based on scroll position
const sections = document.querySelectorAll('section.info-section');
const navLinks = document.querySelectorAll('.nav-links a');

function activateNavLink() {
  let scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach((section, index) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLinks[index]) {
        navLinks[index].classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.focus({preventScroll:true});
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

// Theme toggle: default/dark mode with persistence
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const rootElement = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    rootElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️'; // sun icon for light mode toggle
    themeToggleButton.setAttribute('aria-label', 'Cambiar a modo claro');
    themeToggleButton.title = 'Cambiar a modo claro';
  } else {
    rootElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙'; // moon icon for dark mode toggle
    themeToggleButton.setAttribute('aria-label', 'Cambiar a modo oscuro');
    themeToggleButton.title = 'Cambiar a modo oscuro';
  }
  localStorage.setItem('theme', theme);
}

themeToggleButton.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Initialize theme from localStorage or prefers-color-scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
} else {
  setTheme('light');
}

// Función para abrir el modal
function openModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modal.style.display = "flex"; // Muestra el modal
  modalImage.src = imageSrc; // Establece la fuente de la imagen en el modal
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none"; // Oculta el modal
}

// Agregar evento de clic a las imágenes de la cuadrícula
document.querySelectorAll('.grid-image').forEach((img) => {
  img.addEventListener('click', () => {
    openModal(img.src); // Abre el modal con la imagen
  });
});
