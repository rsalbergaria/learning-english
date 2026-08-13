import { Routes, Route } from "react-router-dom";
import FlashcardsHome from "./FlashcardsHome.jsx";
import DeckPage from "./DeckPage.jsx";

// Esta feature tem suas próprias sub-rotas (lista de decks + estudo de um
// deck), montadas sob o path que o registry.js atribuiu a ela.
export default function FlashcardsFeature() {
  return (
    <Routes>
      <Route index element={<FlashcardsHome />} />
      <Route path=":deckId" element={<DeckPage />} />
    </Routes>
  );
}
