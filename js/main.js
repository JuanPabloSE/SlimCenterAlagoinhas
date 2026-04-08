/* ============================================================
   SLIMCENTER – Alagoinhas/BA
   main.js
   ============================================================ */

/**
 * Menu mobile – abre / fecha
 */
function toggleMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('navOverlay');
  const btn     = document.getElementById('hamburger');
  const isOpen  = menu && menu.classList.contains('open');
  if (isOpen) {
    closeMenu();
  } else {
    if (menu)    { menu.classList.add('open');    menu.setAttribute('aria-hidden', 'false'); }
    if (overlay) { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); }
    if (btn)     { btn.classList.add('open');     btn.setAttribute('aria-expanded', 'true'); }
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('navOverlay');
  const btn     = document.getElementById('hamburger');
  if (menu)    { menu.classList.remove('open');    menu.setAttribute('aria-hidden', 'true'); }
  if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); }
  if (btn)     { btn.classList.remove('open');     btn.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
}

/**
 * Alterna abas de procedimentos.
 * @param {string}      id  - 'facial' | 'corporal' | 'avancada'
 * @param {HTMLElement} btn - botão clicado
 */
function tab(id, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('on');
    b.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.proc-panel').forEach(p => p.classList.remove('on'));

  btn.classList.add('on');
  btn.setAttribute('aria-selected', 'true');

  const panel = document.getElementById('p-' + id);
  if (panel) panel.classList.add('on');
}

/* ── Inicialização ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  // Primeira aba ativa
  const firstBtn = document.querySelector('.tab-btn');
  if (firstBtn) firstBtn.click();

  // Formulário → envia mensagem para WhatsApp
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const nome         = document.getElementById('f-nome').value.trim();
      const whatsapp     = document.getElementById('f-wpp').value.trim();
      const procedimento = document.getElementById('f-proc').value;

      if (!nome || !whatsapp || !procedimento) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
      if (whatsapp.replace(/\D/g, '').length < 10) {
        alert('Digite um número de WhatsApp válido!');
        return;
      }

      const mensagem =
        `Olá! Gostaria de agendar uma avaliação.\n\n` +
        `Nome: ${nome}\nWhatsApp: ${whatsapp}\nProcedimento: ${procedimento}`;

      window.open(
        `https://wa.me/557531832800?text=${encodeURIComponent(mensagem)}`,
        '_blank'
      );
    });
  }

  // Hambúrguer
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  // Fechar menu ao clicar em links mobile ou no overlay
  document.querySelectorAll('.mobile-link, .nav-cta-mobile').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const overlay = document.getElementById('navOverlay');
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Fechar com Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Smooth scroll em âncoras internas
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
