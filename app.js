/* ==========================================
   MINIMALIST ENGINEERING BIO LINK (LINKTREE)
   Interactive Features & Modals Script
   ========================================== */

// --- 1. THEME SWITCHER LOGIC ---
const themeBtns = document.querySelectorAll('.theme-btn');
const body = document.body;

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    themeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const selectedTheme = btn.getAttribute('data-theme');
    body.className = selectedTheme;
  });
});

// --- 2. CAROUSEL SLIDER LOGIC ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
const track = document.getElementById('carouselTrack');
const totalSlides = slides.length;

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Update slides active state
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  // Update dots
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

// Touch Swipe Support for Mobile Carousel
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

// Auto Slide every 6 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}, 6000);

// --- 3. PROJECT DETAIL MODAL ---
const projectData = {
  1: {
    title: "Residência Alto Padrão - Alphaville",
    category: "Engenharia Civil & Estrutura Mista",
    location: "Alphaville, Santana de Parnaíba / SP",
    area: "480 m² de área construída",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Execução completa de estrutura em concreto armado com vãos livres de 12 metros, integração de conceito aberto, fundações profundas em estacas escavadas e acabamentos de altíssimo padrão."
  },
  2: {
    title: "Edifício Corporativo Horizon",
    category: "Reforço Estrutural & Readequação",
    location: "Av. Faria Lima, São Paulo / SP",
    area: "1.200 m² de área útil",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    desc: "Retrofit e laudo de integridade estrutural para expansão de pavimentos corporativos. Aplicação de fibra de carbono em vigas de sustentação e regularização junto à prefeitura."
  },
  3: {
    title: "Villa Contemporânea",
    category: "Projeto Executivo & Compatibilização BIM",
    location: "Campinas / SP",
    area: "350 m²",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    desc: "Compatibilização total de projetos em plataforma BIM (Revit), reduzindo o desperdício de materiais na obra a menos de 2%. Estrutura metálica aparente com painéis térmicos."
  }
};

function openProjectModal(id) {
  const proj = projectData[id];
  const modalContent = document.getElementById('modalContent');
  
  modalContent.innerHTML = `
    <div style="position: relative; width: 100%; height: 200px; border-radius: 12px; overflow: hidden; margin-bottom: 15px;">
      <img src="${proj.img}" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <span style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.75rem; padding: 4px 10px; border-radius: 20px;">${proj.category}</span>
    </div>
    <h2 style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-main); margin-bottom: 6px;">${proj.title}</h2>
    <p style="font-size: 0.85rem; color: var(--text-accent); font-weight: 600; margin-bottom: 12px;"><i class="fa-solid fa-location-dot"></i> ${proj.location} • ${proj.area}</p>
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

// --- 4. QUOTE MODAL & WHATSAPP REDIRECT ---
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
  
  const whatsappUrl = `https://wa.me/5521998577111?text=${encodeURIComponent(message)}`;
  
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

// --- 7. DYNAMIC VCARD GENERATOR ---
function downloadVCard() {
  const vcardData = `BEGIN:VCARD
VERSION:1.0
FN: Eng. Marcio Braga
ORG:MSB Engenharia
TITLE:Engenheiro Civil & Gestor de Projetos
TEL;TYPE=CELL,VOICE:+5521998621382
EMAIL:msbservicos.eng@gmail.com
END:VCARD`;

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'MSB_Engenharia.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Close modals when clicking outside modal-card
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
