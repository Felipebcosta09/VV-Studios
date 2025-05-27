
document.addEventListener('DOMContentLoaded', () => {
  // =======================
  // Menu Mobile
  // =======================
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('menu-overlay');

  if (menuBtn && mobileMenu && overlay) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
      overlay.classList.remove('active');
    });

    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        overlay.classList.remove('active');
      });
    });
  }

  // =======================
  // EmailJS - Envio de Formulário
  // =======================
  emailjs.init("jSVwTzzEpts0wsu3U");

  const form = document.getElementById('contact-form');
  const mensagemEnviada = document.getElementById('mensagem-enviada');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = form.nome.value;
      const email = form.email.value;
      const telemovel = form.telemovel.value;
      const mensagem = form.mensagem.value;

      emailjs.send("service_cawghun", "template_kndjhze", {
      nome,
      email,
      "telemóvel": telemovel,
      mensagem
})
.then(() => {
        if (mensagemEnviada) {
          mensagemEnviada.classList.add('show');
          setTimeout(() => {
            mensagemEnviada.classList.remove('show');
          }, 5000);
        }
        form.reset();
      }).catch(error => {
        alert('Erro ao enviar: ' + JSON.stringify(error));
      });
    });
  }

  // =======================
  // Botão "Voltar ao Topo"
  // =======================
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =======================
  // Animações com Intersection Observer
  // =======================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-animate');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.animate, .animate-left, .animate-right, .animate-top, .animate-bottom').forEach(el => {
    observer.observe(el);
  });

  // =======================
  // Carrossel de Imagens
  // =======================
  const carousel = document.querySelector('.carousel');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

  function getScrollAmount() {
    const firstItem = carousel?.querySelector('.carousel-item');
    if (!firstItem) return 0;

    const style = window.getComputedStyle(firstItem);
    const marginRight = parseInt(style.marginRight) || 0;
    return firstItem.offsetWidth + marginRight;
  }

  if (leftArrow && rightArrow && carousel) {
    leftArrow.addEventListener('click', () => {
      carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    window.addEventListener('load', () => {
      carousel.scrollBy({ left: getScrollAmount() * 2, behavior: 'instant' });
    });
  }
});


// Lightbox simples para imagens
document.querySelectorAll("#portfolio-mobile img").forEach(img => {
  img.addEventListener("click", () => {
    const modal = document.getElementById("imagemModal");
    const imagemAmpliada = document.getElementById("imagemAmpliada");

    imagemAmpliada.src = img.src;
    modal.style.display = "block";
  });
});

document.querySelector(".fechar").addEventListener("click", () => {
  document.getElementById("imagemModal").style.display = "none";
});
