const slides = document.querySelectorAll('.project-preview');
const previousButton = document.getElementById('previous-slide');
const nextButton = document.getElementById('next-slide');
const counter = document.getElementById('slide-counter');
let currentSlide = 0;

function showSlide() {
  // To hide all dashboards, then show only the one we select.
  for (let i = 0; i < slides.length; i++) {
    slides[i].hidden = true;
  }

  slides[currentSlide].hidden = false;
  counter.textContent = (currentSlide + 1) + ' / ' + slides.length;
}

previousButton.addEventListener('click', function () {
  currentSlide--;

  // Go to the last dashboard when moving back from the first.
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide();
});

nextButton.addEventListener('click', function () {
  currentSlide++;

  // Go back to the first dashboard after the last one.
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide();
});

showSlide();

// To highlight the menu item for the section we are reading.
const navbar = document.querySelector('.navbar');
const menuLinks = document.querySelectorAll('nav ul a');

function updatePositionIndicator() {
  const navbarBottom = navbar.getBoundingClientRect().bottom;
  let currentSection = '#home';

  // The last section to reach the bottom of the navbar is the active one.
  for (let i = 0; i < menuLinks.length; i++) {
    const sectionId = menuLinks[i].getAttribute('href');
    const section = document.querySelector(sectionId);

    if (section.getBoundingClientRect().top <= navbarBottom + 1) {
      currentSection = sectionId;
    }
  }

  // Contact may be too short to reach the navbar, so check the page bottom.
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    currentSection = menuLinks[menuLinks.length - 1].getAttribute('href');
  }

  for (let i = 0; i < menuLinks.length; i++) {
    if (menuLinks[i].getAttribute('href') === currentSection) {
      menuLinks[i].classList.add('active');
      menuLinks[i].setAttribute('aria-current', 'location');
    } else {
      menuLinks[i].classList.remove('active');
      menuLinks[i].removeAttribute('aria-current');
    }
  }
}

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('small');
  } else if (window.scrollY <= 10) {
    navbar.classList.remove('small');
  }

  updatePositionIndicator();
}

const navbarObserver = new ResizeObserver(function () {
  document.documentElement.style.scrollPaddingTop = navbar.offsetHeight + 'px';
  updatePositionIndicator();
});
navbarObserver.observe(navbar);

window.addEventListener('scroll', updateNavbar);
window.addEventListener('resize', updatePositionIndicator);
window.addEventListener('load', updateNavbar);
updateNavbar();

const projectModal = document.getElementById('project-modal');
const openProject = document.getElementById('open-project');
const closeProject = document.getElementById('close-project');

openProject.addEventListener('click', function () {
  projectModal.showModal();
  document.body.classList.add('modal-open');
});

closeProject.addEventListener('click', function () {
  projectModal.close();
});

projectModal.addEventListener('close', function () {
  document.body.classList.remove('modal-open');
  openProject.focus();
});
