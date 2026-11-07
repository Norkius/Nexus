const articles = {
  ai: {
    category: "TECNOLOGÍA / 6 MIN",
    title: "La inteligencia artificial está cambiando la forma de crear.",
    lead: "La inteligencia artificial dejó de ser una idea lejana. Hoy es una herramienta que puede ayudar a investigar, aprender, diseñar y resolver problemas.",
    paragraphs: [
      "La inteligencia artificial (IA) permite que los sistemas informáticos realicen tareas que normalmente requieren capacidades humanas, como reconocer patrones, comprender lenguaje o generar contenido. Su avance está cambiando la relación entre las personas y la tecnología.",
      "En educación puede servir para explicar conceptos, proponer ejercicios y organizar información. En el diseño ayuda a explorar ideas; en la ciencia permite analizar grandes cantidades de datos. Su utilidad depende de cómo se use y de la capacidad de las personas para revisar sus resultados.",
      "También existen retos: la privacidad, los errores, los sesgos y el uso responsable de la información. La IA no reemplaza el criterio humano. Es una herramienta que funciona mejor cuando se combina con pensamiento crítico.",
      "La clave no es utilizar tecnología por utilizarla, sino aprender a hacer mejores preguntas y tomar decisiones informadas."
    ]
  },
  cities: {
    category: "INNOVACIÓN / 4 MIN",
    title: "Ciudades inteligentes: vivir mejor con tecnología.",
    lead: "Una ciudad inteligente utiliza información y herramientas digitales para gestionar mejor sus recursos y responder a las necesidades de sus habitantes.",
    paragraphs: [
      "Sensores, redes de comunicación y plataformas de datos pueden ayudar a conocer el estado del tráfico, administrar el alumbrado público y detectar problemas en los servicios. La tecnología permite tomar decisiones con información más precisa.",
      "Pero una ciudad inteligente no se define por tener más pantallas o dispositivos. También debe ser accesible, segura y sostenible. La participación de la comunidad es fundamental para decidir qué problemas necesitan solución.",
      "El desafío consiste en aprovechar la innovación sin dejar a nadie atrás y proteger los datos de quienes viven en la ciudad."
    ]
  },
  space: {
    category: "CIENCIA / 5 MIN",
    title: "Mirar al espacio también es mirar hacia el futuro.",
    lead: "La exploración espacial amplía nuestro conocimiento del universo y desarrolla tecnologías que pueden tener aplicaciones en la vida cotidiana.",
    paragraphs: [
      "Los satélites permiten observar el clima, facilitar las comunicaciones y estudiar cambios en nuestro planeta. Las misiones científicas ayudan a comprender cómo se forman los planetas y cuáles son las condiciones necesarias para la vida.",
      "Investigar el espacio exige avances en materiales, energía, robótica y sistemas de comunicación. Parte de ese conocimiento puede adaptarse a problemas terrestres, desde el monitoreo ambiental hasta la medicina.",
      "Explorar el universo también recuerda la importancia de la cooperación científica y de hacer preguntas que todavía no tienen respuesta."
    ]
  }
};

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("nexus-theme");
if (savedTheme === "light") document.body.classList.add("light");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("nexus-theme", document.body.classList.contains("light") ? "light" : "dark");
});

const cards = [...document.querySelectorAll(".feature-card")];
const filters = [...document.querySelectorAll(".filter-chip")];
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
let activeCategory = "Todos";
function filterCards() {
  const query = (searchInput?.value || "").trim().toLocaleLowerCase("es");
  let visible = 0;
  cards.forEach(card => {
    const matchesCategory = activeCategory === "Todos" || card.dataset.category === activeCategory;
    const matchesSearch = !query || (card.dataset.search + " " + card.innerText).toLocaleLowerCase("es").includes(query);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  if (emptyState) emptyState.hidden = visible !== 0;
}
filters.forEach(filter => filter.addEventListener("click", () => {
  activeCategory = filter.dataset.category;
  filters.forEach(item => item.classList.toggle("selected", item === filter));
  filterCards();
}));
searchInput?.addEventListener("input", filterCards);

const dialog = document.querySelector("#articleDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogCategory = document.querySelector("#dialogCategory");
const dialogLead = document.querySelector("#dialogLead");
const dialogText = document.querySelector("#dialogText");
document.querySelectorAll(".read-more").forEach(button => button.addEventListener("click", () => {
  const article = articles[button.dataset.article];
  if (!article || !dialog) return;
  dialogCategory.textContent = article.category;
  dialogTitle.textContent = article.title;
  dialogLead.textContent = article.lead;
  dialogText.replaceChildren(...article.paragraphs.map(paragraph => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    return p;
  }));
  dialog.showModal();
}));
document.querySelector("#dialogClose")?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#newsletterForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const emailInput = document.querySelector("#emailInput");
  const message = document.querySelector("#formMessage");
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }
  message.textContent = "¡Listo! La demostración funciona, pero todavía no hay un servicio conectado para guardar suscripciones.";
  message.classList.add("success-message");
  emailInput.value = "";
});