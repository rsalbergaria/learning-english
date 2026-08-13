import { Link } from "react-router-dom";
import { decks } from "./decks.js";
import "./flashcards.css";

export default function FlashcardsHome() {
  return (
    <>
      <h1 className="page-title">Flashcards</h1>
      <p className="page-subtitle">Escolha um deck para estudar.</p>

      <div className="module-grid">
        {decks.length === 0 && (
          <p className="empty-state">
            Nenhum deck encontrado. Adicione um arquivo em{" "}
            <code>src/features/flashcards/data/</code>.
          </p>
        )}

        {decks.map((deck) => (
          <Link key={deck.id} to={deck.id} className="module-card">
            <span className="icon">🗂️</span>
            <h2>{deck.name}</h2>
            <p>{deck.description || `${deck.cards.length} cartas`}</p>
            <span className="deck-count">{deck.cards.length} cartas</span>
          </Link>
        ))}
      </div>
    </>
  );
}
