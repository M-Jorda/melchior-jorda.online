// Mettre des bulles cliquables, qui explosent.
// light/dark mode grandissant
// pointeur différent du light/dark mode
// soleil/lune suivant le mode dark/light et  levant/couchant suivant le scroll
// nav same color qui change lorsque on descend qui se cache
// camembert 100% de ma motivation : compétence, plaisirs, volonté de donner
// ikigai personalisé

// =================== HEADER =====================
const header = document.querySelector(".header");
let lastScroll = "0";

window.addEventListener("scroll", () => {
  if (window.scrollY <= lastScroll || window.scrollY === 0) {
    header.classList.remove("header-hidden");
  } else {
    header.classList.add("header-hidden");
  }
  lastScroll = window.scrollY;
});

// ============ LIGHT/DARK MODE ==============

const icon = document.querySelector("#theme-color");
const astre = document.querySelector(".astre");

icon.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    icon.classList.replace("bi-moon-fill", "bi-brightness-high-fill");
    astre.style.opacity = 0; // Réduire l'opacité de l'image
    setTimeout(function () {
      astre.src = "./assets/img/astres/moon.png"; // Changer la source de l'image après la transition
      astre.style.opacity = 1; // Augmenter l'opacité de l'image
    }, 500); // Attendre 0.5 seconde (500 millisecondes) avant de changer la source de l'image
  } else {
    icon.classList.replace("bi-brightness-high-fill", "bi-moon-fill");
    astre.style.opacity = 0; // Réduire l'opacité de l'image
    setTimeout(function () {
      astre.src = "./assets/img/astres/sun.png"; // Changer la source de l'image après la transition
      astre.style.opacity = 1; // Augmenter l'opacité de l'image
    }, 500); // Attendre 0.5 seconde (500 millisecondes) avant de changer la source de l'image
  }
});

// =================== ASTRES ======================

document.addEventListener("DOMContentLoaded", function () {
  // Hauteur de la fenêtre et de la page
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Sélectionner l'image
  const image = document.querySelector(".astre");

  // Fonction pour mettre à jour la position de l'image
  function updateSunPosition() {
    const scrollTop = window.scrollY;
    const scrollPercentage = scrollTop / (documentHeight - windowHeight);

    // Calculer la position horizontale de l'image en fonction du scroll
    let left = scrollPercentage * 1 * 100 + "%";

    // Calculer la position verticale de l'image en fonction de la position horizontale
    let top = (1.5 - Math.sin(scrollPercentage * Math.PI)) * 50 + "%";

    // Appliquer les nouvelles positions à l'image
    image.style.left = left;
    image.style.top = top;
  }

  // Appeler la fonction lors du scroll
  window.addEventListener("scroll", updateSunPosition);

  // Appeler la fonction au chargement de la page
  updateSunPosition();
});

// ======================CARROUSSEL =================

const carousel = document.querySelector("#myCarousel");
const carouselInner = carousel.querySelector(".carousel-inner");
const carouselItems = carouselInner.querySelectorAll(".carousel-item");
const prevBtn = carousel.querySelector(".carousel-control-prev");
const nextBtn = carousel.querySelector(".carousel-control-next");

let currentIndex = 0;

function showSlide(index) {
  carouselItems.forEach((item, i) => {
    if (i === index) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  currentIndex = index;
}

function prevSlide() {
  const prevIndex = currentIndex - 1;
  const lastIndex = carouselItems.length - 1;
  const index = prevIndex < 0 ? lastIndex : prevIndex;
  showSlide(index);
}

function nextSlide() {
  const nextIndex = currentIndex + 1;
  const index = nextIndex > carouselItems.length - 1 ? 0 : nextIndex;
  showSlide(index);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

showSlide(currentIndex);
