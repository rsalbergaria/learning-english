import { Link } from "react-router-dom";
import wordsJson from "./data/words.json";
import wordsTxtRaw from "./data/words.example.txt?raw";
import { parseJsonDeck, parseTxtDeck } from "./utils/parseDeck.js";
import { useFlashcardDeck } from "./hooks/useFlashcardDeck.js";
import Flashcard from "./components/Flashcard.jsx";
import "./flashcards.css";

// Troque para "txt" para usar src/features/flashcards/data/words.example.txt
// como fonte em vez do JSON. Os dois formatos estão documentados nos
// próprios arquivos de dados.
const DATA_SOURCE = "json";

const deck =
  DATA_SOURCE === "txt"
    ? parseTxtDeck(wordsTxtRaw, "Vocabulário Geral")
    : parseJsonDeck(wordsJson);

export default function FlashcardsPage() {
  const { current, position, total, flipped, goNext, goPrev, toggleFlip, shuffle } =
    useFlashcardDeck(deck.cards);

  if (total === 0) {
    return (
      <>
        <h1 className="page-title">{deck.deckName}</h1>
        <p className="empty-state">
          Nenhuma carta encontrada. Adicione palavras em{" "}
          <code>src/features/flashcards/data/words.json</code>.
        </p>
      </>
    );
  }

  return (
    <div className="flashcards-page">
      <div className="flashcards-toolbar">
        <div>
          <h1 className="page-title" style={{ marginBottom: "0.2rem" }}>
            {deck.deckName}
          </h1>
          <span className="flashcards-progress">
            Carta {position + 1} de {total}
          </span>
        </div>
        <Link to="/" className="btn">
          ← Voltar
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
