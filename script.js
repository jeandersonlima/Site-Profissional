document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. EFEITO DE DIGITAÇÃO NO TERMINAL (TYPEWRITER)
     =================================================== */
  const terminalElement = document.querySelector('.terminal-line');
  
  if (terminalElement) {
    const fullText = "> select Jeanderson, foco, soft_skills from perfil where status = 'em_evolucao'";
    let charIndex = 0;

    // Limpa o conteúdo original (deixando apenas o elemento do cursor)
    terminalElement.innerHTML = '<span class="cursor"></span>';
    const cursor = terminalElement.querySelector('.cursor');

    function typeChar() {
      if (charIndex < fullText.length) {
        // Insere o caractere antes do cursor
        const typedText = fullText.substring(0, charIndex + 1);
        terminalElement.innerHTML = typedText + '<span class="cursor"></span>';
        charIndex++;
        
        // Simula variação de tempo de digitação humana (entre 40ms e 90ms)
        const randomSpeed = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
        setTimeout(typeChar, randomSpeed);
      }
    }

    // Inicia a digitação após 500ms
    setTimeout(typeChar, 500);
  }

  /* ===================================================
     2. EFEITO DE ENTRADA AO ROLAR (INTERSECTION OBSERVER)
     =================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe '.in' configurada no seu CSS
          entry.target.classList.add('in');
          // Para de observar o elemento uma vez exibido
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15, // Dispara quando 15% do elemento estiver visível
      rootMargin: '0px 0px -50px 0px' // Margem inferior para antecipar um pouco
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ===================================================
     3. HIGHLIGHT DO MENU AO ROLAR A PÁGINA (OPCIONAL/EXTRA)
     =================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.style.color = 'var(--amber)';
      }
    });
  });

});