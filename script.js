// ---------- Configuração ----------
const WHATSAPP_NUMBER = "554137979956"; // +55 41 998256176 (somente números, com DDI)

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

// ---------- Portfólio: seletor de empresa + carrossel ----------
// Para adicionar uma empresa: copie um bloco abaixo e troque os dados.
// Para adicionar fotos: coloque os arquivos em images/portfolio/<empresa>/ e liste os caminhos em "photos".
// Se a foto não existir (ou a lista estiver vazia), aparece um aviso "Foto em breve" no lugar.
const PORTFOLIO = [
  {
    id: "empresa-1",
    name: "Teletelhas",
    description: "Jaquetas.",
    photos: [
      { src: "images/portfolio/Teletelhas/01.jpeg", alt: "Uniforme operacional da Empresa 1" },
      { src: "images/portfolio/Teletelhas/02.jpeg", alt: "Camiseta com faixa refletiva da Empresa 1" }
    ]
  },
  {
    id: "empresa-2",
    name: "Colégios",
    description: "Moletons e camisetas personalizados",
    photos: [
      { src: "images/portfolio/Colegios/01.jpeg", alt: "Blusa terceirão" },
      { src: "images/portfolio/Colegios/02.jpeg", alt: "Blusa Líria" },
      { src: "images/portfolio/Colegios/03.jpeg", alt: "Blusa Líria" },
      { src: "images/portfolio/Colegios/04.jpeg", alt: "Terceirão" },
      { src: "images/portfolio/Colegios/05.jpeg", alt: "Terceirão" },
      { src: "images/portfolio/Colegios/06.jpeg", alt: "Nono ano" },
      { src: "images/portfolio/Colegios/07.jpeg", alt: "Nono ano" },
    ]
  },
  {
    id: "empresa-3",
    name: "Karatê Goju-Ryu",
    description: "Jaquetas personalizadas",
    photos: [
      { src: "images/portfolio/Karate/01.jpeg", alt: "Frente jaqueta personalizada" },
      { src: "images/portfolio/Karate/02.jpeg", alt: "Costas jaqueta personalizada" }
    ]
  },
  {
    id: "empresa-4",
    name: "Karatê Kyokushin",
    description: "Camisetas personalizadas",
    photos: [
      { src: "images/portfolio/Kyokushin/01.jpeg", alt: "Camiseta personalizada" },
      { src: "images/portfolio/Kyokushin/02.jpeg", alt: "Camiseta personalizada" },
      { src: "images/portfolio/Kyokushin/03.jpeg", alt: "Camiseta personalizada" }
    ]
  },
  {
    id: "empresa-5",
    name: "ROV",
    description: "Camisetas personalizadas",
    photos: [
      { src: "images/portfolio/ROV/01.jpeg", alt: "Camiseta personalizada" },
      { src: "images/portfolio/ROV/02.jpeg", alt: "Camiseta personalizada" },
      { src: "images/portfolio/ROV/03.jpeg", alt: "Camiseta personalizada" },
      { src: "images/portfolio/ROV/04.jpeg", alt: "Camiseta personalizada" }
    ]
  },
  {
    id: "empresa-6",
    name: "Distribuidora Copo Cheio",
    description: "Camisetas personalizadas",
    photos: [
      { src: "images/portfolio/Copo Cheio Distribuidora/01.jpeg", alt: "Camiseta personalizada" },
      { src: "images/portfolio/Copo Cheio Distribuidora/02.jpeg", alt: "Camiseta personalizada" },
    ]
  }
];

const SEAL_SVG = '<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="#F2B844" stroke="#D97823" stroke-width="4"/><g transform="translate(50,50)" stroke="#73130A" stroke-width="5.5" stroke-linecap="round" fill="#73130A"><g><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(45)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(90)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(135)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(180)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(225)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(270)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><g transform="rotate(315)"><line x1="0" y1="-9" x2="0" y2="-25"/><circle cx="0" cy="-29" r="4"/></g><circle cx="0" cy="0" r="5.5" stroke="none"/></g></svg>';

(function initPortfolio() {
  const picker = document.getElementById('companyPicker');
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  const title = document.getElementById('carouselTitle');
  const desc = document.getElementById('carouselDesc');
  const count = document.getElementById('carouselCount');
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  if (!picker || !track) return;

  function makePlaceholder(text) {
    const box = document.createElement('div');
    box.className = 'carousel-placeholder';
    const seal = document.createElement('div');
    seal.className = 'seal';
    seal.innerHTML = SEAL_SVG;
    const label = document.createElement('span');
    label.textContent = text;
    box.append(seal, label);
    return box;
  }

  function slideCount() {
    return track.children.length;
  }

  function currentIndex() {
    const w = track.clientWidth || 1;
    return Math.round(track.scrollLeft / w);
  }

  function goTo(i) {
    const n = slideCount();
    const idx = Math.max(0, Math.min(n - 1, i));
    track.scrollTo({ left: idx * track.clientWidth });
  }

  function updateUI() {
    const n = slideCount();
    const i = Math.min(currentIndex(), n - 1);
    count.textContent = `${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
    dots.querySelectorAll('.carousel-dot').forEach((d, k) => {
      d.setAttribute('aria-current', String(k === i));
    });
    prev.hidden = n <= 1 || i === 0;
    next.hidden = n <= 1 || i === n - 1;
  }

  function showCompany(company) {
    title.textContent = company.name;
    desc.textContent = company.description || '';
    track.innerHTML = '';
    dots.innerHTML = '';

    const photos = company.photos && company.photos.length ? company.photos : [null];

    photos.forEach((photo, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';

      if (photo) {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.alt || `Uniforme produzido para ${company.name}`;
        img.loading = i === 0 ? 'eager' : 'lazy';
        img.addEventListener('error', () => {
          img.remove();
          slide.appendChild(makePlaceholder('Foto em breve'));
        });
        slide.appendChild(img);
      } else {
        slide.appendChild(makePlaceholder('Fotos em breve'));
      }
      track.appendChild(slide);

      if (photos.length > 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Ir para a foto ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dots.appendChild(dot);
      }
    });

    track.scrollLeft = 0;
    updateUI();
  }

  function selectCompany(id) {
    const company = PORTFOLIO.find((c) => c.id === id);
    if (!company) return;
    picker.querySelectorAll('.company-chip').forEach((chip) => {
      chip.setAttribute('aria-selected', String(chip.dataset.id === id));
    });
    showCompany(company);
  }

  PORTFOLIO.forEach((company) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'company-chip';
    chip.dataset.id = company.id;
    chip.setAttribute('role', 'tab');
    chip.textContent = company.name;
    chip.addEventListener('click', () => selectCompany(company.id));
    picker.appendChild(chip);
  });

  prev.addEventListener('click', () => goTo(currentIndex() - 1));
  next.addEventListener('click', () => goTo(currentIndex() + 1));
  track.addEventListener('scroll', () => window.requestAnimationFrame(updateUI), { passive: true });
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex() - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); }
  });
  window.addEventListener('resize', () => goTo(currentIndex()));

  if (PORTFOLIO.length) selectCompany(PORTFOLIO[0].id);
})();

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