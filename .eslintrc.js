module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "warn",
    "vue/require-default-prop": "off",
    "no-console": "warn",
    quotes: ["error", "double", { avoidEscape: true }],
  },
};
