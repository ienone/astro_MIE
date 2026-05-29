import { argbFromHex, hexFromArgb } from "../../node_modules/@material/material-color-utilities/utils/string_utils.js";
import { themeFromSourceColor } from "../../node_modules/@material/material-color-utilities/utils/theme_utils.js";

type MaterialRoleMap = Record<string, number>;
export type MaterialColorStyle = Record<`--${string}`, string>;

const FALLBACK_SEED = "#146b5b";

const MORANDI_SEEDS = [
  "#8fa39a",
  "#9aa6aa",
  "#a89c8d",
  "#b19a9a",
  "#9f98ac",
  "#aaa27f",
  "#8d9caf",
  "#a58f98",
  "#8f9f8a",
  "#b0a08c",
  "#879f9b",
  "#a6a08f"
];

const SCHEME_ROLES = [
  "primary",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "outline",
  "outlineVariant",
  "shadow",
  "scrim",
  "inverseSurface",
  "inverseOnSurface",
  "inversePrimary"
] as const;

const TONE_ROLES = {
  light: {
    surfaceDim: ["neutral", 87],
    surfaceBright: ["neutral", 98],
    surfaceContainerLowest: ["neutral", 100],
    surfaceContainerLow: ["neutral", 96],
    surfaceContainer: ["neutral", 94],
    surfaceContainerHigh: ["neutral", 92],
    surfaceContainerHighest: ["neutral", 90],
    primaryFixed: ["primary", 90],
    primaryFixedDim: ["primary", 80],
    onPrimaryFixed: ["primary", 10],
    onPrimaryFixedVariant: ["primary", 30],
    secondaryFixed: ["secondary", 90],
    secondaryFixedDim: ["secondary", 80],
    onSecondaryFixed: ["secondary", 10],
    onSecondaryFixedVariant: ["secondary", 30],
    tertiaryFixed: ["tertiary", 90],
    tertiaryFixedDim: ["tertiary", 80],
    onTertiaryFixed: ["tertiary", 10],
    onTertiaryFixedVariant: ["tertiary", 30]
  },
  dark: {
    surfaceDim: ["neutral", 6],
    surfaceBright: ["neutral", 24],
    surfaceContainerLowest: ["neutral", 4],
    surfaceContainerLow: ["neutral", 10],
    surfaceContainer: ["neutral", 12],
    surfaceContainerHigh: ["neutral", 17],
    surfaceContainerHighest: ["neutral", 22],
    primaryFixed: ["primary", 90],
    primaryFixedDim: ["primary", 80],
    onPrimaryFixed: ["primary", 10],
    onPrimaryFixedVariant: ["primary", 30],
    secondaryFixed: ["secondary", 90],
    secondaryFixedDim: ["secondary", 80],
    onSecondaryFixed: ["secondary", 10],
    onSecondaryFixedVariant: ["secondary", 30],
    tertiaryFixed: ["tertiary", 90],
    tertiaryFixedDim: ["tertiary", 80],
    onTertiaryFixed: ["tertiary", 10],
    onTertiaryFixedVariant: ["tertiary", 30]
  }
} as const;

function roleNameToToken(role: string) {
  return role.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function normalizeSeed(seed?: string) {
  if (!seed) return FALLBACK_SEED;

  try {
    return hexFromArgb(argbFromHex(seed));
  } catch {
    return FALLBACK_SEED;
  }
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  const match = lightness - chroma / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (huePrime >= 0 && huePrime < 1) [red, green, blue] = [chroma, x, 0];
  else if (huePrime < 2) [red, green, blue] = [x, chroma, 0];
  else if (huePrime < 3) [red, green, blue] = [0, chroma, x];
  else if (huePrime < 4) [red, green, blue] = [0, x, chroma];
  else if (huePrime < 5) [red, green, blue] = [x, 0, chroma];
  else [red, green, blue] = [chroma, 0, x];

  return `#${[red, green, blue]
    .map((channel) => Math.round((channel + match) * 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function createMaterialColorStyleFromString(value: string, fallbackSeed = FALLBACK_SEED): MaterialColorStyle {
  const normalizedValue = value.trim();
  if (!normalizedValue) return createMaterialColorStyle(fallbackSeed);

  const hash = hashString(normalizedValue);
  const hue = hash % 360;
  const saturation = (54 + ((hash >>> 8) % 18)) / 100;
  const lightness = (42 + ((hash >>> 16) % 12)) / 100;

  return createMaterialColorStyle(hslToHex(hue, saturation, lightness));
}

export function createMorandiMaterialColorStyleFromString(value: string, fallbackSeed = FALLBACK_SEED): MaterialColorStyle {
  const normalizedValue = value.trim();
  if (!normalizedValue) return createMaterialColorStyle(fallbackSeed);

  const hash = hashString(normalizedValue);
  const seed = MORANDI_SEEDS[hash % MORANDI_SEEDS.length] ?? fallbackSeed;

  return createMaterialColorStyle(seed);
}

function getSchemeRoles(scheme: { toJSON(): MaterialRoleMap }, theme: ReturnType<typeof themeFromSourceColor>, mode: "light" | "dark") {
  const roles: MaterialRoleMap = {};
  const schemeJson = scheme.toJSON();

  for (const role of SCHEME_ROLES) roles[role] = schemeJson[role];

  const tones = TONE_ROLES[mode];
  for (const [role, [paletteName, tone]] of Object.entries(tones)) {
    const paletteKey = paletteName as keyof typeof theme.palettes;
    roles[role] = theme.palettes[paletteKey].tone(tone);
  }

  roles.surfaceTint = roles.primary;

  return roles;
}

export function createMaterialColorStyle(seed?: string): MaterialColorStyle {
  const normalizedSeed = normalizeSeed(seed);
  const theme = themeFromSourceColor(argbFromHex(normalizedSeed));
  const lightRoles = getSchemeRoles(theme.schemes.light, theme, "light");
  const darkRoles = getSchemeRoles(theme.schemes.dark, theme, "dark");
  const style: MaterialColorStyle = {
    "--post-theme": normalizedSeed,
    "--mie-color-seed": normalizedSeed
  };

  for (const [role, value] of Object.entries(lightRoles)) {
    style[`--mie-light-${roleNameToToken(role)}`] = hexFromArgb(value);
  }

  for (const [role, value] of Object.entries(darkRoles)) {
    style[`--mie-dark-${roleNameToToken(role)}`] = hexFromArgb(value);
  }

  return style;
}
