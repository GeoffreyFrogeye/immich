import { tailwindConfig } from '@immich/ui/theme/default.js';
import plugin from 'tailwindcss/plugin';

const { colors, borderColor } = tailwindConfig();

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@immich/ui/dist/**/*.{svelte,js}',
    '../../ui/src/**/*.{html,js,svelte,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme
        'immich-primary': 'rgb(var(--immich-primary) / <alpha-value>)',
        'immich-bg': 'rgb(var(--immich-bg) / <alpha-value>)',
        'immich-fg': 'rgb(var(--immich-fg) / <alpha-value>)',
        'immich-gray': 'rgb(var(--immich-gray) / <alpha-value>)',
        'immich-error': 'rgb(var(--immich-error) / <alpha-value>)',
        'immich-success': 'rgb(var(--immich-success) / <alpha-value>)',
        'immich-warning': 'rgb(var(--immich-warning) / <alpha-value>)',

        // Dark Theme
        'immich-dark-primary': 'rgb(var(--immich-dark-primary) / <alpha-value>)',
        'immich-dark-bg': 'rgb(var(--immich-dark-bg) / <alpha-value>)',
        'immich-dark-fg': 'rgb(var(--immich-dark-fg) / <alpha-value>)',
        'immich-dark-gray': 'rgb(var(--immich-dark-gray) / <alpha-value>)',
        'immich-dark-error': 'rgb(var(--immich-dark-error) / <alpha-value>)',
        'immich-dark-success': 'rgb(var(--immich-dark-success) / <alpha-value>)',
        'immich-dark-warning': 'rgb(var(--immich-dark-warning) / <alpha-value>)',

        ...colors,
      },
      borderColor,
      fontFamily: {
        'immich-mono': ['Overpass Mono', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
      },
      screens: {
        tall: { raw: '(min-height: 800px)' },
        'max-2xl': { max: '1535px' },
        'max-xl': { max: '1279px' },
        'max-lg': { max: '1023px' },
        'max-md': { max: '767px' },
        'max-sm': { max: '639px' },
        sidebar: { min: '850px' },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'grid-auto-fit': (value) => ({
            gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
          }),
          'grid-auto-fill': (value) => ({
            gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
          }),
        },
        { values: theme('width') },
      );
    }),
  ],
};
