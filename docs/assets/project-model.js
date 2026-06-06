export const THEMES = {
  red: {
    name: "Red",
    logo: "images/branding/logo-1.png",
    background: "#180706",
    panel: "#260c09",
    text: "#fff5ed",
    muted: "#d8aaa0",
    accent: "#e34f3d",
  },
  orange: {
    name: "Orange",
    logo: "images/branding/logo-2.png",
    background: "#fff3e3",
    panel: "#ffe5ca",
    text: "#4a2717",
    muted: "#815540",
    accent: "#ff8d47",
  },
  black: {
    name: "Black and White",
    logo: "images/branding/logo-3.png",
    background: "#030303",
    panel: "#0b0b0b",
    text: "#f4f4f4",
    muted: "#aaaaaa",
    accent: "#ffffff",
  },
  blue: {
    name: "Blue",
    logo: "images/branding/logo-4.png",
    background: "#07131b",
    panel: "#0d2230",
    text: "#eefaff",
    muted: "#9bc1d4",
    accent: "#31a9df",
  },
  green: {
    name: "Green",
    logo: "images/branding/logo-5.png",
    background: "#09170e",
    panel: "#10271a",
    text: "#f0fff3",
    muted: "#9bc4a5",
    accent: "#58b86f",
  },
  yellow: {
    name: "Yellow-Orange",
    logo: "images/branding/logo-6.png",
    background: "#1c1202",
    panel: "#2b1c04",
    text: "#fff8df",
    muted: "#dac38d",
    accent: "#f4ad24",
  },
};

export function createSlug(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function publicField(state, realValue = "", teaserValue = "", genericTeaser = "") {
  if (state === "revealed") return realValue || "";
  if (state === "teaser") return teaserValue || genericTeaser;
  return "";
}

export function getTheme(themeName) {
  return THEMES[themeName] || THEMES.orange;
}

export function getFeaturedProject(projects = []) {
  return projects.find((project) => project.is_featured) || projects[0] || null;
}

export function normalizeProject(project = {}) {
  return {
    id: project.id || "",
    slug: project.slug || createSlug(project.title || "untitled-project"),
    title: project.title || "Coming Soon",
    tagline: project.tagline || "",
    summary: project.summary || "",
    description: project.description || "",
    status: project.status || "In Development",
    project_type: project.project_type || "Film",
    poster_url: project.poster_url || "",
    actors: project.actors || "",
    production_company: project.production_company || "",
    credits: Array.isArray(project.credits) ? project.credits : [],
    tags: Array.isArray(project.tags) ? project.tags : [],
    theme: THEMES[project.theme] ? project.theme : "orange",
    is_featured: Boolean(project.is_featured),
  };
}
