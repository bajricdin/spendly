// The app's theme: every colour, spacing, font size and corner radius in one place.
// Colours are named by their ROLE (what they are used for), not by how they look.

export const Colors = {
  light: {
    text: '#1A2433',
    muted: '#5B6475', // less important text: labels, dates
    background: '#FFFFFF',
    card: '#F3F5FB',
    border: '#DDE2EE',
    primary: '#4F46E5', // Spendly's main colour (indigo)
    onPrimary: '#FFFFFF', // text drawn on top of the primary colour
    income: '#1E8E3E',
    expense: '#D93025',
  },
  dark: {
    text: '#F2F4F7',
    muted: '#9AA6B5',
    background: '#0F1424', // dark blue-grey, not pure black
    card: '#1A2133',
    border: '#2A3348',
    primary: '#A5B4FC', // lighter indigo so it stays readable on dark
    onPrimary: '#0F1424',
    income: '#6FCF97',
    expense: '#FF8A80',
  },
} as const;

// "Theme" is the type of one set of colours, e.g. Colors.light.
export type Theme = (typeof Colors)['light'];

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;
export const Radius = { sm: 8, md: 12, pill: 999 } as const;
