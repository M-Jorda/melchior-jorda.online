let pie = document.querySelector(".pie");
let skill = document.querySelector(".skill");

document.querySelectorAll(".slice").forEach((item) => {
  item.addEventListener("click", skillPie);
});

function skillPie(event) {
  const currentActive = document.querySelector(".slice-active");
  const item = event.currentTarget; // Utilisez event.currentTarget pour obtenir l'élément cible du listener

  if (!currentActive) {
    pie.classList.add("pie-active");
  }

  // Toggle la classe "slice-active" sur la slice cliquée
  item.classList.toggle("slice-active");

  // Si une autre slice était active, la désactiver
  if (currentActive && currentActive !== item) {
    currentActive.classList.remove("slice-active");
  }

  // Si aucune slice n'est active, supprimer la classe "pie-active" de la pie
  if (!document.querySelector(".slice-active")) {
    pie.classList.remove("pie-active");
  }

  // Définir le texte à afficher en fonction de la slice cliquée
  const sliceId = item.id; // Utilisez item.id au lieu de event.target.closest(".slice").id
  const skillText = skills[sliceId];

  if (pie.classList.contains("pie-active")) {
    // Afficher le texte dans l'élément .skill
    skill.innerText = skillText;
    skill.classList.remove("d-none");

    // Ajouter la classe 'active' pour déclencher l'animation
    skill.classList.add("skillActive");
  } else {
    // Retirer la classe 'active' pour cacher le texte et réinitialiser l'animation
    skill.classList.remove("skillActive");
  }
}
