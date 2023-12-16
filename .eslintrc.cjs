/** @type {import('eslint').Linter.Config} */
module.exports = {
  $schema: "https://json.schemastore.org/eslintrc",
  root: true,
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    "plugin:tailwindcss/recommended"
  ],
  rules: {
    "react/jsx-key": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error"
  },
  settings: {
    "tailwindcss": {
      "callees": ["cn"],
      "config": "tailwind.config.ts"
    },
    "next": {
      "rootDir": true
    }
  },
  overrides: [
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser"
    }
  ]
}
