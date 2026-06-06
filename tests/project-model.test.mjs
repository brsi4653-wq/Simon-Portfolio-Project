import assert from "node:assert/strict";
import {
  createSlug,
  getFeaturedProject,
  getTheme,
  publicField,
} from "../docs/assets/project-model.js";

assert.equal(createSlug("  Moving Forward!  "), "moving-forward");
assert.equal(createSlug("A Film: Part II"), "a-film-part-ii");

assert.equal(publicField("private", "Real", "Tease", "Generic"), "");
assert.equal(publicField("teaser", "Real", "Tease", "Generic"), "Tease");
assert.equal(publicField("teaser", "Real", "", "Generic"), "Generic");
assert.equal(publicField("revealed", "Real", "Tease", "Generic"), "Real");

assert.equal(getTheme("black").logo, "images/branding/logo-3.png");
assert.equal(getTheme("does-not-exist").name, "Orange");

const featured = getFeaturedProject([
  { slug: "one", is_featured: false },
  { slug: "two", is_featured: true },
]);
assert.equal(featured.slug, "two");
assert.equal(getFeaturedProject([{ slug: "one", is_featured: false }]).slug, "one");

console.log("project-model tests passed");
