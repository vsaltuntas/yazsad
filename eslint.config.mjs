import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // prototype/ dokunulmaz referans — lint etme
    ignores: [
      "node_modules/**",
      ".next/**",
      ".open-next/**",
      "drizzle/migrations/**",
      "coverage/**",
      "prototype/**",
    ],
  },
);
