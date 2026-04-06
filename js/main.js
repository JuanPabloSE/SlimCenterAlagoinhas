/* ============================================================
   SLIMCENTER – Alagoinhas/BA
   main.js
   ============================================================ */

/**
 * Menu mobile – hambúrguer
 */
function toggleMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('navOverlay');
  const btn     = document.getElementById('hamburger');
  const isOpen  = menu && menu.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    if (menu)    menu.classList.add('open');
    if (overlay) overlay.classList.add('open');
    if (btn)     btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('navOverlay');
  const btn     = document.getElementById('hamburger');
  if (menu)    menu.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (btn)     btn.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Alterna as abas de procedimentos.
 * @param {string} id  - ID do painel ('facial' | 'corporal' | 'avancada')
 * @param {HTMLElement} btn - Botão clicado
 */
function tab(id, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.proc-panel').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  const panel = document.getElementById('p-' + id);
  if (panel) panel.classList.add('on');
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', function () {

  // Primeira aba ativa
  const firstBtn = document.querySelector('.tab-btn');
  if (firstBtn) firstBtn.click();

  // Formulário → WhatsApp
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const nome         = document.querySelector('input[type="text"]').value.trim();
      const whatsapp     = document.querySelector('input[type="tel"]').value.trim();
      const procedimento = document.querySelector('.form-select').value;

      if (!nome || !whatsapp || !procedimento) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
      if (whatsapp.length < 10) {
        alert('Digite um número de WhatsApp válido!');
        return;
      }

      const mensagem = `Olá! Gostaria de agendar uma avaliação.\n\nNome: ${nome}\nWhatsApp: ${whatsapp}\nProcedimento: ${procedimento}`;
      window.open(`https://wa.me/557531832800?text=${encodeURIComponent(mensagem)}`, '_blank');
    });
  }

  // Hambúrguer
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Fechar menu ao clicar em links mobile
  document.querySelectorAll('.mobile-link, .nav-cta-mobile').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
