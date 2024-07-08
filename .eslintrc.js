module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    // Add additional ESLint rules here
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
