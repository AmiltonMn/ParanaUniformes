// ---------- Configuração ----------
const WHATSAPP_NUMBER = "5541998256176"; // +55 41 998256176 (somente números, com DDI)

// ---------- Menu mobile ----------
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');

function setMenuOpen(isOpen) {
  links.classList.toggle('open', isOpen);
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
}

burger.addEventListener('click', () => {
  setMenuOpen(!links.classList.contains('open'));
});

links.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => setMenuOpen(false));
});

// ---------- WhatsApp ----------
function openWhatsApp(message) {
  const text = encodeURIComponent(message || "Olá! Vim pelo site da Paraná Uniformes. Gostaria de fazer um orçamento!");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank", "noopener");
}

document.querySelectorAll(".whatsapp-link").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    openWhatsApp(el.dataset.whatsappMessage);
    setMenuOpen(false);
  });
});
