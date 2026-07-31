/* ==========================================
   MINIMALISTA ENGENHARIA LINKTREE
   Funções Interativas e Modais
   ========================================== */

// --- 1. SELETOR DE TEMA COM PERSISTÊNCIA (LOCALSTORAGE) ---
const themeBtns = document.querySelectorAll('.theme-btn');
const body = document.body;

function applyTheme(themeName) {
  body.className = themeName;
  themeBtns.forEach(b => {
    if (b.getAttribute('data-theme') === themeName) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
}

// Restaura tema salvo no navegador ou mantém o padrão
const savedTheme = localStorage.getItem('msb_selected_theme');
if (savedTheme) {
  applyTheme(savedTheme);
}

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedTheme = btn.getAttribute('data-theme');
    applyTheme(selectedTheme);
    localStorage.setItem('msb_selected_theme', selectedTheme);
  });
});

// --- 2. LÓGICA DO CARROSSEL ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
const track = document.getElementById('carouselTrack');
const totalSlides = slides.length;

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Atualiza os slides ativos
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  // Atualiza os dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
}

document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

// Slide Touch no Celular
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX - touchEndX > 50) {
    // Swipe left
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  } else if (touchEndX - touchStartX > 50) {
    // Swipe right
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
}

// Auto Slide a cada 8 segundos
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}, 8000);

// --- 3. MODAL DE DETALHES DO PROJETO (GALERIA) ---
const projectData = {
  1: {
    title: "Estabilização de Taludes com Solo Grampeado",
    category: "Serviços Geotécnicos",
    img: "https://ik.imagekit.io/Outwake/MSB%20Engenharia/1.png",
    desc: "Estabilização de taludes com solo grampeado é uma técnica de engenharia geotécnica utilizada para aumentar a estabilidade de encostas naturais e taludes escavados. O sistema consiste na instalação de barras de aço (grampos) no interior do maciço, posteriormente injetadas com calda de cimento, trabalhando em conjunto com revestimentos como concreto projetado e sistemas de drenagem."
  },
  2: {
    title: "Hidrossemeadura",
    category: "Hidrossemeadura / Proteção Ambiental",
    location: "Proteção de Encostas & Controle de Erosão",
    area: "Aplicação por Jateamento de Alta Pressão",
    img: "https://ik.imagekit.io/Outwake/MSB%20Engenharia/4.png",
    desc: "Aplicação técnica de hidrossemeadura para revegetação e biofixação do solo em taludes. O processo combina sementes, fertilizantes, aditivos e mulching para rápida fixação da vegetação, prevenindo erosões provocadas pelas chuvas."
  },
  3: {
    title: "Locação de Máquinas & Equipamentos",
    category: "Locação de Máquinas",
    location: "Movimentação de Terra & Escavação",
    area: "Retroescavadeiras & Escavadeiras Operadas",
    img: "https://ik.imagekit.io/Outwake/MSB%20Engenharia/3.png",
    desc: "Disponibilizamos máquinas e equipamentos de alto desempenho para obras de engenharia geotécnica, infraestrutura e construção civil. Nossa frota é composta por equipamentos modernos e confiáveis, garantindo produtividade, segurança e eficiência para atender às demandas de cada projeto."
  },
  
  4: {
    title: "Cortina Atirantada",
    category: "Serviços Geotécnicos",
    location: "Contenção em Concreto Armado Ancorada por Tirantes",
    img: "https://ik.imagekit.io/Outwake/MSB%20Engenharia/2.png",
    desc: "A cortina atirantada é uma solução de contenção utilizada para estabilizar escavações e taludes em áreas com restrição de espaço ou elevadas solicitações estruturais. O sistema é composto por uma estrutura de concreto armado ancorada por tirantes, que transferem os esforços para camadas resistentes do terreno, proporcionando segurança, estabilidade e controle dos deslocamentos. É amplamente empregada em obras de infraestrutura, edificações, rodovias, ferrovias e empreendimentos industriais, garantindo desempenho, durabilidade e confiabilidade mesmo em condições geotécnicas complexas."
  },

  5: {
    title: "Muro de Gabião",
    category: "Serviços Geotécnicos / Contenções",
    img: "https://ik.imagekit.io/Outwake/MSB%20Engenharia/5.png",
    desc: "O muro de gabião é uma solução de contenção flexível e altamente permeável, composta por gaiolas de malha metálica em aço galvanizado preenchidas com pedras selecionadas. É ideal para estabilização de taludes, controle de erosão e proteção de margens e encostas, garantindo drenagem natural eficiente e perfeita integração ambiental."
  }

};

function openProjectModal(id) {
  const proj = projectData[id];
  const modalContent = document.getElementById('modalContent');
  let locationLine = '';
  if (proj.location && proj.area) {
    locationLine = `<i class="fa-solid fa-location-dot"></i> ${proj.location} • ${proj.area}`;
  } else if (proj.location) {
    locationLine = `<i class="fa-solid fa-location-dot"></i> ${proj.location}`;
  } else if (proj.area) {
  locationLine = proj.area;
  }
  modalContent.innerHTML = `
    <div style="position: relative; width: 100%; height: 200px; border-radius: 12px; overflow: hidden; margin-bottom: 15px;">
      <img src="${proj.img}" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <span style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.75rem; padding: 4px 10px; border-radius: 20px;">${proj.category}</span>
    </div>
    <h2 style=" font-size: 1.4rem; color: var(--text-main); margin-bottom: 6px;">${proj.title}</h2>
    <p style="font-size: 0.85rem; color: var(--text-accent); font-weight: 600; margin-bottom: 12px;">${locationLine}</p>
    <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">${proj.desc}</p>
    <a href="https://wa.me/5521998621382?text=Ol%C3%A1!%20Vi%20o%20projeto%20${encodeURIComponent(proj.title)}%20no%20site%20e%20gostaria%20de%20um%20or%C3%A7amento%20semelhante." target="_blank" class="btn-submit-whatsapp">
      <i class="fa-brands fa-whatsapp"></i> Quero um orçamento como este
    </a>
  `;
  
  document.getElementById('projectModal').classList.add('active');
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
}

// --- 4. MODAL DE ORÇAMENTO E REDIRECIONAMENTO WHATSAPP ---
function openQuoteModal() {
  document.getElementById('quoteModal').classList.add('active');
}

function closeQuoteModal() {
  document.getElementById('quoteModal').classList.remove('active');
}

function handleQuoteSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('clientName').value;
  const type = document.getElementById('projectType').value;
  const area = document.getElementById('projectArea').value;
  const details = document.getElementById('projectDetails').value;
  
  const message = `*SOLICITAÇÃO DE ORÇAMENTO - WEBSITE*\n\n` +
                  `*Nome:* ${name}\n` +
                  `*Serviço:* ${type}\n` +
                  `*Área/Local:* ${area || 'Não informado'}\n` +
                  ` *Detalhes:* ${details || 'Sem observações'}\n\n` +
                  `Gostaria de agendar uma conversa para orçamento.`;
  
  const whatsappUrl = `https://wa.me/5521998621382?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank');
  closeQuoteModal();
}

// --- 5. CREA & CERTIFICATIONS MODAL ---
function openCreaModal() {
  document.getElementById('creaModal').classList.add('active');
}

function closeCreaModal() {
  document.getElementById('creaModal').classList.remove('active');
}

// --- 6. GEOTECNIA & MÁQUINAS MODALS ---
function openGeotecniaModal() {
  document.getElementById('geotecniaModal').classList.add('active');
}

function closeGeotecniaModal() {
  document.getElementById('geotecniaModal').classList.remove('active');
}

function openMaquinasModal() {
  document.getElementById('maquinasModal').classList.add('active');
}

function closeMaquinasModal() {
  document.getElementById('maquinasModal').classList.remove('active');
}

// --- 7. QR CODE MODAL ---
function openQrModal() {
  document.getElementById('qrModal').classList.add('active');
}

function closeQrModal() {
  document.getElementById('qrModal').classList.remove('active');
}

// --- 7. CONTATO MODAL & GERADOR VCARD ---
function openContactModal() {
  const vcardText = `BEGIN:VCARD
VERSION:3.0
N:Braga;Marcio;;Eng.;
FN:Eng. Marcio Braga - MSB Engenharia
ORG:MSB Engenharia
TEL;TYPE=CELL,VOICE;VALUE=uri:tel:+5521998621382
TEL;TYPE=CELL:+5521998621382
EMAIL:msbservicos.eng@gmail.com
URL:https://www.instagram.com/msb.engenharia_/
END:VCARD`;

  const dataUri = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcardText);
  const vcardLink = document.getElementById('vcardDataLink');
  if (vcardLink) {
    vcardLink.href = dataUri;
  }
  
  document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
  document.getElementById('contactModal').classList.remove('active');
}

function copyContactInfo() {
  const textToCopy = `Eng. Marcio Braga - MSB Engenharia\nTelefone: (21) 99862-1382\nE-mail: msbservicos.eng@gmail.com`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showCopyFeedback();
    }).catch(() => {
      fallbackCopyText(textToCopy);
    });
  } else {
    fallbackCopyText(textToCopy);
  }
}

function showCopyFeedback() {
  const btnText = document.getElementById('copyBtnText');
  if (btnText) {
    const originalText = btnText.innerText;
    btnText.innerText = '✓ Copiado para a área de transferência!';
    setTimeout(() => {
      btnText.innerText = originalText;
    }, 2500);
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    alert(text);
  }
  document.body.removeChild(textArea);
}

function downloadVCard() {
  openContactModal();
}

// Close modals quando clica fora
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});

// --- 8. LÓGICA DE SCROLL REVEAL (FADE-IN UP) ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -25px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
