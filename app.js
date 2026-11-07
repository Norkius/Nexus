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

// Local content manager: browser-only storage, not a shared CMS.
const LOCAL_ARTICLES_KEY = "nexus-local-articles-v1";
function getLocalArticles(){try{return JSON.parse(localStorage.getItem(LOCAL_ARTICLES_KEY)||"[]")}catch{return []}}
function saveLocalArticles(items){localStorage.setItem(LOCAL_ARTICLES_KEY,JSON.stringify(items))}
function renderLocalArticles(){
  const items=getLocalArticles();
  const list=document.querySelector("#localArticleList");
  if(list) list.replaceChildren(...(items.length?items.map(item=>{const row=document.createElement("div");row.className="local-article-row";const title=document.createElement("span");title.textContent=item.title;const remove=document.createElement("button");remove.type="button";remove.textContent="Eliminar";remove.addEventListener("click",()=>{saveLocalArticles(getLocalArticles().filter(x=>x.id!==item.id));renderLocalArticles();renderAllArticles()});row.append(title,remove);return row}):[Object.assign(document.createElement("p"),{textContent:"Todavía no has creado artículos en este navegador."})]));
}
function renderAllArticles(){
  const grid=document.querySelector("#articleGrid"); if(!grid)return;
  grid.querySelectorAll(".local-card").forEach(card=>card.remove());
  getLocalArticles().forEach(item=>{
    const card=document.createElement("article");card.className="feature-card local-card";card.dataset.category=item.category;card.dataset.search=(item.title+" "+item.summary).toLocaleLowerCase("es");
    const visual=document.createElement("div");visual.className="card-visual visual-ai";const tag=document.createElement("div");tag.className="visual-tag";tag.textContent="NEXUS / COMUNIDAD";visual.append(tag);
    const body=document.createElement("div");body.className="card-body";const meta=document.createElement("div");meta.className="card-meta";const cat=document.createElement("span");cat.textContent=item.category.toUpperCase();const time=document.createElement("span");time.textContent="LECTURA";meta.append(cat,time);
    const heading=document.createElement("h3");heading.textContent=item.title;const summary=document.createElement("p");summary.textContent=item.summary;const read=document.createElement("button");read.className="text-link";read.type="button";read.textContent="Leer artículo ↗";read.addEventListener("click",()=>openLocalArticle(item));body.append(meta,heading,summary,read);card.append(visual,body);grid.append(card);
  });
  filterCards();
}
function openLocalArticle(item){
  const dialog=document.querySelector("#articleDialog");if(!dialog)return;
  document.querySelector("#dialogCategory").textContent=item.category.toUpperCase()+" / NEXUS COMMUNITY";
  document.querySelector("#dialogTitle").textContent=item.title;
  document.querySelector("#dialogLead").textContent=item.summary;
  const target=document.querySelector("#dialogText");target.replaceChildren(...item.body.split(/\\n\\s*\\n/).filter(Boolean).map(text=>{const p=document.createElement("p");p.textContent=text;return p}));dialog.showModal();
}
const adminDialog=document.querySelector("#adminDialog");
document.querySelector("#adminOpen")?.addEventListener("click",()=>{renderLocalArticles();adminDialog?.showModal()});
document.querySelector("#adminClose")?.addEventListener("click",()=>adminDialog?.close());
adminDialog?.addEventListener("click",event=>{if(event.target===adminDialog)adminDialog.close()});
document.querySelector("#articleForm")?.addEventListener("submit",event=>{
  event.preventDefault();const title=document.querySelector("#newTitle").value.trim();const category=document.querySelector("#newCategory").value;const summary=document.querySelector("#newSummary").value.trim();const body=document.querySelector("#newBody").value.trim();if(!title||!summary||!body)return;
  const items=getLocalArticles();items.unshift({id:Date.now().toString(36),title,category,summary,body});saveLocalArticles(items);event.target.reset();renderLocalArticles();renderAllArticles();
});
document.querySelector("#clearLocalArticles")?.addEventListener("click",()=>{if(confirm("¿Eliminar todos los artículos guardados en este navegador?")){saveLocalArticles([]);renderLocalArticles();renderAllArticles()}});
const ideaForm=document.querySelector("#ideaForm");
ideaForm?.addEventListener("submit",event=>{event.preventDefault();const input=document.querySelector("#ideaInput");const msg=document.querySelector("#ideaMessage");const idea=input.value.trim();if(!idea)return;try{const ideas=JSON.parse(localStorage.getItem("nexus-ideas-v1")||"[]");ideas.push({idea,createdAt:new Date().toISOString()});localStorage.setItem("nexus-ideas-v1",JSON.stringify(ideas));msg.textContent="Sugerencia guardada en este navegador. Aún no se ha enviado al equipo NEXUS.";msg.classList.add("success-message");input.value=""}catch{msg.textContent="No se pudo guardar la sugerencia en este navegador."}});
renderAllArticles();
