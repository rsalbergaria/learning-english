import { Link, useParams } from "react-router-dom";
import { getDeckById } from "./decks.js";
import { useFlashcardDeck } from "./hooks/useFlashcardDeck.js";
import Flashcard from "./components/Flashcard.jsx";
import "./flashcards.css";

export default function DeckPage() {
  const { deckId } = useParams();
  const deck = getDeckById(deckId);

  if (!deck) {
    return (
      <>
        <h1 className="page-title">Deck não encontrado</h1>
        <p className="page-subtitle">
          <Link to="..">← Voltar para os decks</Link>
        </p>
      </>
    );
  }

  return <DeckStudySession deck={deck} />;
}

function DeckStudySession({ deck }) {
  const { current, position, total, flipped, goNext, goPrev, toggleFlip, shuffle } =
    useFlashcardDeck(deck.cards);

  if (total === 0) {
    return (
      <>
        <h1 className="page-title">{deck.name}</h1>
        <p className="empty-state">Este deck não tem cartas ainda.</p>
      </>
    );
  }

  return (
    <div className="flashcards-page">
      <div className="flashcards-toolbar">
        <div>
          <h1 className="page-title" style={{ marginBottom: "0.2rem" }}>
            {deck.name}
          </h1>
          <span className="flashcards-progress">
            Carta {position + 1} de {total}
          </span>
        </div>
        <Link to=".." className="btn">
          ← Decks
        </Link>
      </div>

      <Flashcard card={current} flipped={flipped} onFlip={toggleFlip} />

      <div className="flashcards-controls">
        <button className="btn" onClick={goPrev}>
          ← Anterior
        </button>
        <button className="btn btn-primary" onClick={toggleFlip}>
          Virar carta
        </button>
        <button className="btn" onClick={goNext}>
          Próxima →
        </button>
        <button className="btn" onClick={shuffle}>
          🔀 Embaralhar
        </button>
      </div>

      <p className="flashcards-hints">
        Atalhos: ← / → para navegar, espaço ou enter para virar a carta.
      </p>
    </div>
  );
}
