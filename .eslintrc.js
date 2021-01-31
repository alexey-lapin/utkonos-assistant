module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },

  extends: ["plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint"],

  plugins: ["@typescript-eslint"],

  env: {
    node: true,
    es6: true,
  },

  globals: {
    chrome: "readonly",
  },
};
