"use strict";

/* ===== 1. Menu burger ===== */
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
}

burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
// Ferme le menu quand on clique sur un lien (utile sur mobile)
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

/* ===== 2. Images : si une URL ne charge pas, on garde le dégradé de fond ===== */
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => { img.style.visibility = "hidden"; });
});

/* ===== 3. Modale d'aperçu rapide ===== */
const modal = document.getElementById("quick-modal");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDesc = document.getElementById("modal-desc");

document.querySelectorAll(".btn-quick").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card"); // les infos sont lues dans les data-* de la carte
    modalTitle.textContent = card.dataset.name;
    modalPrice.textContent = card.dataset.price;
    modalDesc.textContent = card.dataset.desc;
    modal.showModal();
  });
});

modal.querySelector(".modal-close").addEventListener("click", () => modal.close());
document.getElementById("modal-add").addEventListener("click", () => modal.close());
// Clic sur le fond sombre = fermeture
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* ===== 4. Validation du formulaire ===== */
const form = document.getElementById("contact-form");
const success = document.getElementById("form-success");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Retourne un message d'erreur, ou "" si le champ est valide
function validate(input) {
  const value = input.value.trim();
  if (input.name === "name" && value.length < 2) return "Entre ton nom (2 caractères minimum).";
  if (input.name === "email" && !emailRegex.test(value)) return "Entre une adresse e-mail valide.";
  if (input.name === "message" && value.length < 10) return "Ton message doit faire au moins 10 caractères.";
  return "";
}

function showError(input, message) {
  const field = input.closest(".field");
  field.classList.toggle("invalid", message !== "");
  field.querySelector(".error").textContent = message;
}

form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => showError(input, validate(input)));
  input.addEventListener("input", () => { if (input.closest(".invalid")) showError(input, validate(input)); });
});

form.addEventListener("submit", (e) => {
  e.preventDefault(); // empêche le rechargement de la page
  let isValid = true;

  form.querySelectorAll("input, textarea").forEach((input) => {
    const message = validate(input);
    showError(input, message);
    if (message) isValid = false;
  });

  if (!isValid) { success.hidden = true; return; }

  const firstName = form.elements.name.value.trim().split(" ")[0];
  success.textContent = `Merci ${firstName}, ton message est bien envoyé. On te répond très vite.`;
  success.hidden = false;
  form.reset();
});
