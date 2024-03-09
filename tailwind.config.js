import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#f5fbef',
            foreground: '#11181C',
            primary: '#40f99b',
            secondary: '#a3a3a3',
            tertiary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              DEFAULT: '#5b21b6',
            },
            default: {
              50: '#f7f7f8',
              100: '#eeeef0',
              200: '#d9d9de',
              300: '#b8b9c1',
              400: '#91939f',
              500: '#737584',
              600: '#5d5e6c',
              700: '#4c4d58',
              800: '#41414b',
              900: '#393941',
              950: '#18181b',
            },
          },
        },
        dark: {
          colors: {
            background: '#11181C',
            foreground: '#f5fbef',
            primary: '#40f99b',
            secondary: '#a3a3a3',
            tertiary: {
              50: '#f5f3ff',
              100: '#ede9fe',
              200: '#ddd6fe',
              300: '#c4b5fd',
              400: '#a78bfa',
              500: '#8b5cf6',
              600: '#7c3aed',
              700: '#6d28d9',
              800: '#5b21b6',
              DEFAULT: '#5b21b6',
            },
            default: {
              50: '#fafafa',
              100: '#efefef',
              200: '#dcdcdc',
              300: '#bdbdbd',
              400: '#989898',
              500: '#7c7c7c',
              600: '#656565',
              700: '#525252',
              800: '#464646',
              900: '#3d3d3d',
              950: '#292929',
            },
          },
        },
      },
    }),
  ],
};
