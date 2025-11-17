document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica do Carrossel ---
  const carousel = document.querySelector("#heroCarousel");
  if (carousel) {
    const items = carousel.querySelectorAll(".carousel-item");
    const prevButton = carousel.querySelector(".carousel-control-prev");
    const nextButton = carousel.querySelector(".carousel-control-next");
    let currentIndex = 0;
    let intervalId;

    function showItem(index) {
      // Remove a classe 'active' de todos os itens
      items.forEach((item) => item.classList.remove("active"));
      // Adiciona a classe 'active' ao item atual
      items[index].classList.add("active");
    }

    function nextItem() {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    }

    function prevItem() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    }

    function startCarousel() {
      // Troca de imagem a cada 4 segundos
      intervalId = setInterval(nextItem, 4000);
    }

    // Adiciona os eventos de clique nos botões
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nextItem();
        // Reinicia o intervalo para não haver uma troca dupla
        clearInterval(intervalId);
        startCarousel();
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        prevItem();
        // Reinicia o intervalo
        clearInterval(intervalId);
        startCarousel();
      });
    }

    // Inicia o carrossel
    startCarousel();
  }

  // --- Lógica do Menu Responsivo (Toggler) ---
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarNav");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      // Adiciona/remove a classe 'active' no toggler para a animação do ícone
      navbarToggler.classList.toggle("active");
      // Mostra/esconde o menu
      navbarCollapse.classList.toggle("show");
      // Impede o scroll do body quando o menu está aberto
      document.body.classList.toggle("no-scroll");
    });

    // Fecha o menu ao clicar em um link (útil para single page)
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click(); // Simula o clique para fechar tudo corretamente
        }
      });
    });
  }

  // --- Lógica para permitir apenas números no campo de telefone ---
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      // Remove qualquer caractere que não seja um dígito
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });
  });

  // --- Lógica para mudar o fundo da navbar ao rolar ---
  const mainNav = document.querySelector(".main-nav");
  if (mainNav) {
    // Pega a altura da navbar definida no CSS para o scroll-margin-top
    const navHeight =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--altura-nav")
        .trim() || "70px";

    window.addEventListener("scroll", () => {
      if (window.scrollY > parseInt(navHeight, 10)) {
        mainNav.classList.add("scrolled");
      } else {
        mainNav.classList.remove("scrolled");
      }
    });
  }

  // --- Lógica de Validação de Formulários ---
  function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const successMessage = form.querySelector(".success-message");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio padrão do formulário

      let isFormValid = true;
      const inputs = form.querySelectorAll("[required]");

      // Remove a classe 'invalid' de todos antes de validar novamente
      inputs.forEach((input) => {
        input.classList.remove("invalid");
      });

      inputs.forEach((input) => {
        let isValid = true;
        // Validação para email
        if (input.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
          }
        }
        // Validação para campo de arquivo
        else if (input.type === "file") {
          if (input.files.length === 0) {
            isValid = false;
          }
        }
        // Validação para outros campos obrigatórios
        else if (input.value.trim() === "") {
          isValid = false;
        }

        if (!isValid) {
          isFormValid = false;
          input.classList.add("invalid");
        }
      });

      if (isFormValid) {
        successMessage.style.display = "block"; // Mostra a mensagem de sucesso
        form.reset(); // Limpa o formulário

        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      }
    });
  }

  // Aplica a validação aos dois formulários
  validateForm("form-franquia");
  validateForm("form-trabalhe");
});
