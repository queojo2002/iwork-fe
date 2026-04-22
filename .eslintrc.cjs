module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "jsx-a11y",
    "react-hooks",
    "prettier"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": [
      "warn",
      {
        "tabWidth": 2,
        "trailingComma": "none",
        "semi": true,
        "arrowParens": "always",
        "endOfLine": "auto",
        "useTabs": false,
        "singleQuote": false,
        "printWidth": 120,
        "jsxSingleQuote": false
      }
    ]
  },
}
