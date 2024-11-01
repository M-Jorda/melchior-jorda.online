const fr = document.querySelector(".fr");
const es = document.querySelector(".es");
const en = document.querySelector(".en");

let skills;

document.addEventListener("DOMContentLoaded", () => {
  loadLanguage("fr");
  fr.classList.add("currentFlag");
});

fr.addEventListener("click", () => {
  loadLanguage("fr");
  updateCurrentFlag(fr);
});

en.addEventListener("click", () => {
  loadLanguage("en");
  updateCurrentFlag(en);
});

es.addEventListener("click", () => {
  loadLanguage("es");
  updateCurrentFlag(es);
});

function updateCurrentFlag(selectedFlag) {
  [fr, en, es].forEach((flag) => {
    if (flag !== selectedFlag) {
      flag.classList.remove("currentFlag");
    }
  });
  selectedFlag.classList.add("currentFlag");
}

// Fonction pour charger la langue spécifiée
function loadLanguage(lang) {
  fetch(`./assets/languages/${lang}.json`)
    .then((res) => res.json())
    .then((data) => displayLanguages(data))
    .catch((err) => console.error("Erreur : ", err));
}

function displayLanguages(language) {
  const navLinks = document.querySelectorAll(".nav-link");
  const titles = document.querySelectorAll(".title");
  const presP = document.querySelectorAll(".presentP");
  const IDoP = document.querySelectorAll(".iDoP");
  const des = document.querySelectorAll(".des");
  const contactP = document.querySelectorAll(".contactP");
  const labels = document.querySelectorAll(".form-label");

  navLinks.forEach((link, index) => {
    link.innerHTML = language.links[index];
  });

  titles.forEach((title, index) => {
    title.innerHTML = language.titles[index];
  });

  presP.forEach((p, index) => {
    p.innerHTML = language.articles.presentation[index];
  });

  IDoP.forEach((p, index) => {
    p.innerHTML = language.articles.IDo[index];
  });

  des.forEach((p, index) => {
    p.innerHTML = language.articles.projects[index];
  });

  contactP.forEach((p, index) => {
    p.innerHTML = language.articles.contact[index];
  });

  labels.forEach((label, index) => {
    label.innerHTML = language.articles.form[index];
  });
  skills = language.articles.skills;
}
