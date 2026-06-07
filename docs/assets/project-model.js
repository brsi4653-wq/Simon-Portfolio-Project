export const THEMES = {
  red: {
    name: "Red",
    logo: "images/branding/logo-1.png",
    background: "#fff4f2",
    panel: "#ffe1dd",
    text: "#401716",
    muted: "#81514e",
    accent: "#ff3131",
    isLight: true,
  },
  orange: {
    name: "Orange",
    logo: "images/branding/logo-2.png",
    background: "#fff3e3",
    panel: "#ffe5ca",
    text: "#4a2717",
    muted: "#815540",
    accent: "#ff8d47",
    isLight: true,
  },
  black: {
    name: "Black and White",
    logo: "images/branding/logo-3.png",
    background: "#030303",
    panel: "#0b0b0b",
    text: "#f4f4f4",
    muted: "#aaaaaa",
    accent: "#ffffff",
    isLight: false,
  },
  blue: {
    name: "Blue",
    logo: "images/branding/logo-4.png",
    background: "#f1faff",
    panel: "#d9f1ff",
    text: "#102f40",
    muted: "#467083",
    accent: "#38b6ff",
    isLight: true,
  },
  green: {
    name: "Green",
    logo: "images/branding/logo-5.png",
    background: "#f4fff0",
    panel: "#ddf7d2",
    text: "#183c20",
    muted: "#50765a",
    accent: "#7ed957",
    isLight: true,
  },
  yellow: {
    name: "Yellow-Orange",
    logo: "images/branding/logo-6.png",
    background: "linear-gradient(135deg, #fff9e8 0%, #fff0d9 100%)",
    panel: "#ffe9bc",
    text: "#4b2a12",
    muted: "#876041",
    accent: "#ff9e4f",
    isLight: true,
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
