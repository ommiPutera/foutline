import type { Config } from 'tailwindcss'
const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p: string) => path.join(__dirname, p)

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '5vw': '5vw',
        '8vw': '8vw',
        '10vw': '10vw',
        '15vw': '15vw',
      }
    },
  },
} satisfies Config

