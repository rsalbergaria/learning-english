export default function Flashcard({ card, flipped, onFlip }) {
  if (!card) return null;

  return (
    <div
      className="flashcard-scene"
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label="Toque para virar a carta"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
    >
      <div className={`flashcard${flipped ? " is-flipped" : ""}`}>
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-label">Inglês</span>
          <p className="flashcard-word">{card.front}</p>
          <span className="flashcard-hint">toque para virar</span>
        </div>
        <div className="flashcard-face flashcard-back">
          <span className="flashcard-label">Português</span>
          <p className="flashcard-word">{card.back}</p>
          {card.example && <p className="flashcard-example">“{card.example}”</p>}
        </div>
      </div>
    </div>
  );
}
