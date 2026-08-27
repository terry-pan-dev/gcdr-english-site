export const THEME_STORAGE_KEY = "gcdr-prototype-theme";

export const prototypeThemes = [
  { id: "slate-gold", name: "Slate Gold", swatch: "#4a5e6d" },
  { id: "dark-forest", name: "Dark Forest", swatch: "#2c3830" },
  { id: "ink-ochre", name: "Ink & Ochre", swatch: "#2a2d2e" },
  { id: "dusk-terracotta", name: "Dusk & Terracotta", swatch: "#6b6068" },
  { id: "forest-brass", name: "Forest & Brass", swatch: "#2a3d30" },
  { id: "smoke-copper", name: "Smoke & Copper", swatch: "#3d4f5c" },
  { id: "stone-rust", name: "Stone & Rust", swatch: "#6e6860" },
] as const;

export type PrototypeThemeId = (typeof prototypeThemes)[number]["id"];

export const defaultPrototypeTheme: PrototypeThemeId = "forest-brass";
