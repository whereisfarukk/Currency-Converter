import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      semi: ["warn", "always"],
      "no-console": "warn", // Adds a warning for console.log usage
    },
  },
];
