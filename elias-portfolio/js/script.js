/* Configurações: preencha os campos abaixo quando tiver os dados definitivos. */
const SITE_CONFIG = {
  whatsappNumber: "", // Somente dígitos, incluindo código do país e DDD. Ex.: 5511999999999
  email: "",
  githubUrl: "",
  linkedinUrl: "",
  
formspreeEndpoint: "https://formspree.io/f/xwlvrnvd"

};

document.documentElement.classList.add("js-ready");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  siteNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

/* Reveal progressivo: se IntersectionObserver não existir, os elementos continuam visíveis. */
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Habilita apenas contatos realmente configurados; links vazios nunca fingem funcionar. */
const contactDefinitions = {
  whatsapp: {
    value: SITE_CONFIG.whatsappNumber,
    build: (value) => `https://wa.me/${value}?text=${encodeURIComponent("Olá, Elias! Vi seu portfólio e gostaria de um orçamento para meu negócio.")}`,
    label: (value) => `+${value}`
  },
  email: {
    value: SITE_CONFIG.email,
    build: (value) => `mailto:${value}`,
    label: (value) => value
  },
  github: {
    value: SITE_CONFIG.githubUrl,
    build: (value) => value,
    label: (value) => value.replace(/^https?:\/\//, "").replace(/\/$/, "")
  },
  linkedin: {
    value: SITE_CONFIG.linkedinUrl,
    build: (value) => value,
    label: (value) => value.replace(/^https?:\/\//, "").replace(/\/$/, "")
  }
};

Object.entries(contactDefinitions).forEach(([key, definition]) => {
  const link = document.querySelector(`[data-contact-link="${key}"]`);
  const label = document.querySelector(`[data-contact-label="${key}"]`);
  const value = definition.value.trim();
  if (!link || !label || !value) return;
  const isUrl = key === "github" || key === "linkedin";
  if (isUrl && !/^https:\/\/.+/i.test(value)) return;
  if (key === "whatsapp" && !/^\d{10,15}$/.test(value)) return;
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;
  link.href = definition.build(value);
  if (isUrl) link.target = "_blank";
  if (isUrl) link.rel = "noopener noreferrer";
  label.textContent = definition.label(value);
  link.classList.remove("is-unconfigured");
});

/* Formulário: envia por endpoint configurado ou abre um rascunho de e-mail.
   Sem endpoint/e-mail, oferece uma mensagem copiável em vez de simular envio. */
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function setStatus(message, type = "") {
  formStatus.textContent = message;
  formStatus.classList.toggle("error", type === "error");
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll("input, select, textarea")];
  fields.forEach((field) => {
    field.removeAttribute("aria-invalid");
    if (!field.checkValidity()) field.setAttribute("aria-invalid", "true");
  });
  if (!form.checkValidity()) {
    form.reportValidity();
    setStatus("Confira os campos destacados e tente novamente.", "error");
    fields.find((field) => !field.checkValidity())?.focus();
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name")).trim();
  const email = String(data.get("email")).trim();
  const projectType = String(data.get("projectType")).trim();
  const message = String(data.get("message")).trim();
  const body = `Nome: ${name}\nE-mail: ${email}\nTipo de projeto: ${projectType}\n\nMensagem:\n${message}`;

  if (SITE_CONFIG.formspreeEndpoint.trim()) {
    try {
      const response = await fetch(SITE_CONFIG.formspreeEndpoint.trim(), {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      });
      if (!response.ok) throw new Error("Falha no envio");
      form.reset();
      setStatus("Mensagem enviada! Obrigado pelo contato. A confirmação depende do serviço de formulário configurado.");
      return;
    } catch {
      setStatus("Não foi possível enviar agora. Tente novamente ou use um canal de contato configurado.", "error");
      return;
    }
  }

  if (SITE_CONFIG.email.trim()) {
    const subject = encodeURIComponent(`Orçamento de site — ${name}`);
    window.location.href = `mailto:${SITE_CONFIG.email.trim()}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setStatus("Abrimos seu aplicativo de e-mail com a mensagem preparada. Finalize o envio por lá.");
    return;
  }

  try {
    await navigator.clipboard.writeText(body);
    setStatus("Mensagem copiada! O envio direto ainda não está configurado. Configure um e-mail ou endpoint no arquivo js/script.js.");
  } catch {
    setStatus("O envio direto ainda não está configurado. Copie os dados do formulário e configure um e-mail ou endpoint no arquivo js/script.js.", "error");
  }
});
