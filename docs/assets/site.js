import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { getFeaturedProject, getTheme, normalizeProject } from "./project-model.js";

const SUPABASE_URL = "https://ldgkmvfvvpojvsxlveft.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_X_ciiz-WIMQrgLMNMutWjg_gS6SckHY";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const fallbackProjects = [
  normalizeProject({
    slug: "moving-forward",
    title: "Moving Forward",
    tagline: "One foot moving forward after the other",
    summary: "A short dramatic film about grief, perspective, friendship, and learning to keep moving forward after loss.",
    description:
      "Moving Forward is a short dramatic film about grief, perspective, and learning how to keep living after loss. The story follows a protagonist whose friend helps him understand that people often carry unseen struggles, and that healing sometimes means choosing to move forward one step at a time.",
    status: "In Production",
    project_type: "Short Dramatic Film",
    poster_url: "images/projects/moving-forward/poster.jpg",
    actors: "Lion Ciuffreda and Preston Fitzgerald",
    production_company: "JPHSLS Production",
    credits: [
      { role: "Presented By", name: "CEC" },
      { role: "Production", name: "JPHSLS Production" },
      { role: "Film By", name: "Simon Brookes" },
      { role: "Starring", name: "Lion Ciuffreda and Preston Fitzgerald" },
      { role: "Music By", name: "Enzo Alves" },
      { role: "Editor", name: "Enzo Alves" },
      { role: "Production Designer", name: "Preston Fitzgerald" },
      { role: "Director of Photography", name: "Jonah Benvie" },
      { role: "Executive Producer", name: "Preston Fitzgerald" },
      { role: "Written By", name: "Preston Fitzgerald" },
      { role: "Directed By", name: "Simon Brookes" },
    ],
    tags: ["Grief", "Perspective", "Mental health", "Hidden struggles", "Friendship"],
    theme: "black",
    is_featured: true,
  }),
];

let projects = fallbackProjects;
const views = Array.from(document.querySelectorAll(".view"));
const navButtons = Array.from(document.querySelectorAll("[data-view]"));
const brandLogo = document.getElementById("brand-logo");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function poster(project, size = "") {
  if (!project.poster_url) {
    return `<div class="poster-frame ${size} poster-placeholder"><span>Poster To Be Revealed</span></div>`;
  }
  return `<button class="poster-frame ${size}" data-project="${escapeHtml(project.slug)}" aria-label="Open ${escapeHtml(project.title)} project">
    <img src="${escapeHtml(project.poster_url)}" alt="${escapeHtml(project.title)} poster" />
  </button>`;
}

function tags(project) {
  return project.tags.length
    ? `<ul class="theme-list">${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>`
    : "";
}

function renderFeatured() {
  const project = getFeaturedProject(projects);
  const container = document.getElementById("featured-project");
  if (!project) {
    container.innerHTML = `<div class="wrap"><h2 class="project-title">Projects</h2><p>New work will be revealed here.</p></div>`;
    return;
  }
  container.innerHTML = `<div class="wrap feature">
    ${poster(project)}
    <div>
      <span class="eyebrow">Featured Project</span>
      <h2 class="project-title">${escapeHtml(project.title)}</h2>
      <span class="tag">${escapeHtml(project.project_type)} / ${escapeHtml(project.status)}</span>
      <p class="copy">${escapeHtml(project.summary)}</p>
      ${tags(project)}
      <p><button class="button" data-project="${escapeHtml(project.slug)}">View Project</button></p>
    </div>
  </div>`;
}

function renderProjects() {
  const container = document.getElementById("projects-grid");
  container.innerHTML = projects.length
    ? projects
        .map(
          (project) => `<article class="card">
            ${poster(project, "small")}
            <h2>${escapeHtml(project.title)}</h2>
            <span class="tag">${escapeHtml(project.project_type)} / ${escapeHtml(project.status)}</span>
            <p>${escapeHtml(project.summary)}</p>
            <button class="button" data-project="${escapeHtml(project.slug)}">Enter Project</button>
          </article>`,
        )
        .join("")
    : `<p>No projects have been published yet.</p>`;
}

function renderDetail(project) {
  const theme = getTheme(project.theme);
  document.body.style.setProperty("--detail-bg", theme.background);
  document.body.style.setProperty("--detail-panel", theme.panel);
  document.body.style.setProperty("--detail-text", theme.text);
  document.body.style.setProperty("--detail-muted", theme.muted);
  document.body.style.setProperty("--detail-accent", theme.accent);
  brandLogo.src = theme.logo;

  const creditRows = project.credits
    .map((credit) => `<dt>${escapeHtml(credit.role)}</dt><dd>${escapeHtml(credit.name)}</dd>`)
    .join("");
  document.getElementById("project-detail").innerHTML = `<section>
    <div class="wrap detail">
      ${project.poster_url ? `<div class="poster-frame"><img src="${escapeHtml(project.poster_url)}" alt="${escapeHtml(project.title)} poster" /></div>` : poster(project)}
      <div>
        <span class="eyebrow">${escapeHtml(project.project_type)}</span>
        <h1 class="project-title">${escapeHtml(project.title)}</h1>
        <span class="tag">${escapeHtml(project.status)}</span>
        ${project.tagline ? `<p class="project-tagline">${escapeHtml(project.tagline)}</p>` : ""}
        <p class="copy">${escapeHtml(project.description || project.summary)}</p>
        ${tags(project)}
        ${project.actors ? `<div class="notice"><strong>Starring:</strong> ${escapeHtml(project.actors)}</div>` : ""}
        ${project.production_company ? `<div class="notice"><strong>Production:</strong> ${escapeHtml(project.production_company)}</div>` : ""}
      </div>
    </div>
  </section>
  ${creditRows ? `<section><div class="wrap"><span class="eyebrow">Credits</span><div class="credits"><dl>${creditRows}</dl></div></div></section>` : ""}`;
}

function bindProjectButtons() {
  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => showProject(button.dataset.project));
  });
}

function showView(viewId) {
  const nextView = document.getElementById(viewId) ? viewId : "home";
  document.body.classList.remove("detail-theme");
  brandLogo.src = "images/branding/logo-2.png";
  views.forEach((view) => view.classList.toggle("active", view.id === nextView));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === nextView));
  history.replaceState(null, "", `#${nextView}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showProject(slug) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return showView("projects");
  renderDetail(project);
  document.body.classList.add("detail-theme");
  views.forEach((view) => view.classList.toggle("active", view.id === "project-detail"));
  navButtons.forEach((button) => button.classList.remove("active"));
  history.replaceState(null, "", `#project/${slug}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadProjects() {
  const { data, error } = await supabase.from("public_projects").select("*");
  if (!error && Array.isArray(data) && data.length) {
    projects = data.map(normalizeProject);
  }
  renderFeatured();
  renderProjects();
  bindProjectButtons();
}

navButtons.forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
document.getElementById("year").textContent = new Date().getFullYear();

renderFeatured();
renderProjects();
bindProjectButtons();

const hash = location.hash.slice(1);
if (hash.startsWith("project/")) showProject(hash.slice("project/".length));
else showView(hash || "home");

loadProjects();
