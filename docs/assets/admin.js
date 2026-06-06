import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { createSlug, getTheme, publicField, THEMES } from "./project-model.js";

const SUPABASE_URL = "https://ldgkmvvwpojvsxlveft.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_X_ciiz-WIMQrgLMNMutWjg_gS6SckHY";
const ADMIN_EMAIL = "simon_j_brookes@icloud.com";
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const revealFields = ["title", "tagline", "summary", "description", "poster", "actors", "production_company", "credits"];

const loginPanel = document.getElementById("login-panel");
const adminApp = document.getElementById("admin-app");
const form = document.getElementById("project-form");
const message = document.getElementById("editor-message");
const projectList = document.getElementById("project-list");
let projects = [];

function setMessage(text = "", isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

function isAdmin(user) {
  return user?.email?.toLowerCase() === ADMIN_EMAIL;
}

function renderControls() {
  document.getElementById("theme-options").innerHTML = Object.entries(THEMES)
    .map(([key, theme]) => `<label class="theme-choice"><input type="radio" name="theme" value="${key}" ${key === "orange" ? "checked" : ""} /><span class="theme-swatch" style="background:${theme.accent}"></span>${theme.name}</label>`)
    .join("");
  document.getElementById("reveal-controls").innerHTML = revealFields
    .map((field) => `<div class="reveal-control"><label>${field.replaceAll("_", " ")}<select name="reveal_${field}"><option value="private">Private</option><option value="teaser">Teaser</option><option value="revealed" selected>Revealed</option></select></label></div>`)
    .join("");
}

function parseCredits(value = "") {
  return value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => {
    const separator = line.indexOf(":");
    return separator === -1
      ? { role: "Credit", name: line }
      : { role: line.slice(0, separator).trim(), name: line.slice(separator + 1).trim() };
  });
}

function creditsToText(credits = []) {
  return credits.map((credit) => `${credit.role}: ${credit.name}`).join("\n");
}

function formValue(name) {
  return form.elements[name]?.value?.trim() || "";
}

function collectProject() {
  const revealStates = Object.fromEntries(revealFields.map((field) => [field, form.elements[`reveal_${field}`].value]));
  return {
    slug: createSlug(formValue("slug") || formValue("title")),
    title: formValue("title") || "Untitled Project",
    teaser_title: formValue("teaser_title") || "Coming Soon",
    tagline: formValue("tagline"),
    teaser_tagline: formValue("teaser_tagline"),
    summary: formValue("summary"),
    teaser_summary: formValue("teaser_summary"),
    description: formValue("description"),
    teaser_description: formValue("teaser_description"),
    status: formValue("status") || "In Development",
    project_type: formValue("project_type") || "Film",
    poster_url: formValue("poster_url"),
    teaser_poster_url: formValue("teaser_poster_url"),
    actors: formValue("actors"),
    teaser_actors: formValue("teaser_actors"),
    production_company: formValue("production_company"),
    teaser_production_company: formValue("teaser_production_company"),
    credits: parseCredits(formValue("credits")),
    teaser_credits: formValue("teaser_credits"),
    tags: formValue("tags").split(",").map((tag) => tag.trim()).filter(Boolean),
    theme: form.elements.theme.value,
    reveal_states: revealStates,
    is_published: form.elements.is_published.checked,
    is_featured: form.elements.is_featured.checked,
  };
}

function resetForm() {
  form.reset();
  document.getElementById("project-id").value = "";
  document.getElementById("editor-title").textContent = "New Project";
  document.getElementById("poster-preview").hidden = true;
  form.elements.theme.value = "orange";
  revealFields.forEach((field) => { form.elements[`reveal_${field}`].value = "revealed"; });
  setMessage();
  renderPreview();
}

function fillForm(project) {
  resetForm();
  document.getElementById("project-id").value = project.id;
  document.getElementById("editor-title").textContent = project.title;
  Object.entries(project).forEach(([key, value]) => {
    if (!form.elements[key] || ["credits", "tags", "reveal_states"].includes(key)) return;
    if (form.elements[key].type === "checkbox") form.elements[key].checked = Boolean(value);
    else form.elements[key].value = value ?? "";
  });
  form.elements.credits.value = creditsToText(project.credits);
  form.elements.tags.value = (project.tags || []).join(", ");
  revealFields.forEach((field) => { form.elements[`reveal_${field}`].value = project.reveal_states?.[field] || "revealed"; });
  const preview = document.getElementById("poster-preview");
  preview.hidden = !project.poster_url;
  preview.src = project.poster_url || "";
  document.querySelectorAll(".project-item").forEach((item) => item.classList.toggle("active", item.dataset.id === project.id));
  renderPreview();
}

function renderProjectList() {
  projectList.innerHTML = projects.length
    ? projects.map((project) => `<button class="project-item" data-id="${project.id}"><strong>${project.title}</strong><small>${project.is_published ? "Published" : "Draft"}${project.is_featured ? " / Featured" : ""}</small></button>`).join("")
    : "<p>No projects yet.</p>";
  document.querySelectorAll(".project-item").forEach((button) => button.addEventListener("click", () => fillForm(projects.find((project) => project.id === button.dataset.id))));
}

function renderPreview() {
  const project = collectProject();
  const state = project.reveal_states;
  const title = publicField(state.title, project.title, project.teaser_title, "Coming Soon");
  const summary = publicField(state.summary, project.summary, project.teaser_summary, "A new project is taking shape.");
  const posterUrl = publicField(state.poster, project.poster_url, project.teaser_poster_url, "");
  const theme = getTheme(project.theme);
  document.getElementById("editor-preview").innerHTML = `${posterUrl ? `<img src="${posterUrl}" alt="" />` : "<p>Poster hidden</p>"}<h3>${title || "Title hidden"}</h3><p>${summary || "Summary hidden"}</p><small>Theme: ${theme.name}</small>`;
}

async function loadProjects() {
  const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });
  if (error) {
    setMessage("The editor database is not ready yet. Run supabase-setup.sql in the Supabase SQL Editor.", true);
    return;
  }
  projects = data || [];
  renderProjectList();
  if (projects.length) fillForm(projects[0]);
  else resetForm();
}

async function uploadPoster(project) {
  const file = document.getElementById("poster-file").files[0];
  if (!file) return project;
  const extension = file.name.split(".").pop().toLowerCase();
  const path = `${project.slug}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("project-media").upload(path, file, { contentType: file.type });
  if (error) throw error;
  project.poster_url = supabase.storage.from("project-media").getPublicUrl(path).data.publicUrl;
  return project;
}

async function saveProject(event) {
  event.preventDefault();
  setMessage("Saving...");
  try {
    const id = document.getElementById("project-id").value;
    const project = await uploadPoster(collectProject());
    if (project.is_featured && !project.is_published) throw new Error("Publish the project before making it featured.");
    if (project.is_featured) {
      const { error } = await supabase.from("projects").update({ is_featured: false }).eq("is_featured", true);
      if (error) throw error;
    }
    const result = id
      ? await supabase.from("projects").update(project).eq("id", id).select().single()
      : await supabase.from("projects").insert(project).select().single();
    if (result.error) throw result.error;
    setMessage("Project saved.");
    await loadProjects();
    fillForm(result.data);
  } catch (error) {
    setMessage(error.message || "The project could not be saved.", true);
  }
}

async function deleteProject() {
  const id = document.getElementById("project-id").value;
  if (!id || !confirm("Delete this project permanently?")) return;
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return setMessage(error.message, true);
  await loadProjects();
}

function duplicateProject() {
  const project = collectProject();
  resetForm();
  Object.entries(project).forEach(([key, value]) => {
    if (!form.elements[key] || ["credits", "tags", "reveal_states", "is_featured"].includes(key)) return;
    if (form.elements[key].type === "checkbox") form.elements[key].checked = Boolean(value);
    else form.elements[key].value = value ?? "";
  });
  form.elements.title.value = `${project.title} Copy`;
  form.elements.slug.value = `${project.slug}-copy`;
  form.elements.credits.value = creditsToText(project.credits);
  form.elements.tags.value = project.tags.join(", ");
  form.elements.is_featured.checked = false;
  revealFields.forEach((field) => { form.elements[`reveal_${field}`].value = project.reveal_states[field]; });
  renderPreview();
}

async function enterAdmin(user) {
  if (!isAdmin(user)) {
    await supabase.auth.signOut();
    document.getElementById("login-message").textContent = "This Google account is not authorized.";
    return;
  }
  loginPanel.hidden = true;
  adminApp.hidden = false;
  document.getElementById("sign-out").hidden = false;
  document.getElementById("account-label").textContent = user.email;
  await loadProjects();
}

renderControls();
resetForm();
form.addEventListener("submit", saveProject);
form.addEventListener("input", () => {
  if (!formValue("slug") && formValue("title")) form.elements.slug.value = createSlug(formValue("title"));
  renderPreview();
});
document.getElementById("new-project").addEventListener("click", resetForm);
document.getElementById("delete-project").addEventListener("click", deleteProject);
document.getElementById("duplicate-project").addEventListener("click", duplicateProject);
document.getElementById("google-login").addEventListener("click", () => supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: location.href,
    queryParams: { prompt: "select_account" },
  },
}));
document.getElementById("sign-out").addEventListener("click", async () => { await supabase.auth.signOut(); location.reload(); });

const { data: { session } } = await supabase.auth.getSession();
if (session?.user) enterAdmin(session.user);
supabase.auth.onAuthStateChange((_event, nextSession) => {
  if (nextSession?.user && adminApp.hidden) enterAdmin(nextSession.user);
});
