// eslint.config.js
import globals from "globals";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["lib/**/*"]
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json"
      },
      globals: {
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin
    },
    rules: {
      "quotes": ["error", "double"],
      "object-curly-spacing": ["error", "never"],
      "max-len": ["error", {"code": 80}],
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];