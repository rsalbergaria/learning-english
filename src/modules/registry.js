// Registro central de "módulos" (features) do site.
//
// Para adicionar uma nova feature no futuro:
//   1. Crie uma pasta em src/features/<nome-da-feature>
//   2. Exporte o componente de página dela
//   3. Adicione uma entrada abaixo, com um `path` de rota único
// A Home e o roteador (App.jsx) leem esta lista automaticamente —
// nenhum outro arquivo precisa ser tocado para o módulo aparecer no menu.

import { lazy } from "react";

const FlashcardsPage = lazy(() => import("../features/flashcards/FlashcardsPage.jsx"));

export const modules = [
  {
    id: "flashcards",
    name: "Flashcards",
    description: "Estude palavras em inglês com cartões de memorização.",
    icon: "🗂️",
    path: "/flashcards",
    element: FlashcardsPage,
    enabled: true,
  },
];
