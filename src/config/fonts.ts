/**
 * Font configuration
 * Centralized configuration for Google Fonts used in the application
 */

export const fonts = {
  primary: {
    name: 'Roboto',
    weights: [300, 400, 500, 700],
    italic: [400],
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap',
  },
  secondary: {
    name: 'Cormorant Garamond',
    weights: [400, 500, 600],
    italic: [400],
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap',
  },
} as const;

/**
 * Get the combined Google Fonts URL for all fonts
 */
export function getGoogleFontsUrl(): string {
  const fontsList = [
    `family=${fonts.primary.name.replace(/\s+/g, '+')}:ital,wght@${fonts.primary.weights.map(w => `0,${w}`).join(';')}${fonts.primary.italic.length > 0 ? `;${fonts.primary.italic.map(w => `1,${w}`).join(';')}` : ''}`,
    `family=${fonts.secondary.name.replace(/\s+/g, '+')}:ital,wght@${fonts.secondary.weights.map(w => `0,${w}`).join(';')}${fonts.secondary.italic.length > 0 ? `;${fonts.secondary.italic.map(w => `1,${w}`).join(';')}` : ''}`,
  ];
  return `https://fonts.googleapis.com/css2?${fontsList.join('&')}&display=swap`;
}

/**
 * Get the CSS font-family value for the primary font
 */
export function getPrimaryFontFamily(): string {
  return `'${fonts.primary.name}', sans-serif`;
}

/**
 * Get the CSS font-family value for the secondary font
 */
export function getSecondaryFontFamily(): string {
  return `'${fonts.secondary.name}', Georgia, serif`;
}

