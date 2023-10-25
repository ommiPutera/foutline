import type { Config } from 'tailwindcss'

const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const fromRoot = (p: string) => path.join(__dirname, p)

/** @type {import('tailwindcss').Config} */
export default {
  content: [fromRoot('./app/**/*.+(js|jsx|ts|tsx|mdx|md)')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Matter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config

