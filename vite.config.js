import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Base precisa bater com o nome do repositório no GitHub Pages,
// já que o Pages serve o projeto em https://<user>.github.io/<repo>/
// Se o repositório mudar de nome, atualize aqui também.
export default defineConfig({
  plugins: [react()],
  base: "/learning-english/",
});
