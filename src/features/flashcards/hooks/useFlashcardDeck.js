import { useCallback, useEffect, useMemo, useState } from "react";

function shuffledIndexes(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useFlashcardDeck(cards) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Se o deck mudar (ex: outra fonte de dados), reinicia a ordem.
  useEffect(() => {
    setOrder(cards.map((_, i) => i));
    setPosition(0);
    setFlipped(false);
  }, [cards]);

  const current = useMemo(() => {
    if (cards.length === 0) return null;
    return cards[order[position]];
  }, [cards, order, position]);

  const goNext = useCallback(() => {
    setFlipped(false);
    setPosition((p) => (cards.length === 0 ? 0 : (p + 1) % cards.length));
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setPosition((p) => (cards.length === 0 ? 0 : (p - 1 + cards.length) % cards.length));
  }, [cards.length]);

  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  const shuffle = useCallback(() => {
    setOrder(shuffledIndexes(cards.length));
    setPosition(0);
    setFlipped(false);
  }, [cards.length]);

  // Atalhos de teclado: ← anterior, → próximo, espaço/enter vira a carta
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleFlip();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, toggleFlip]);

  return {
    current,
    position,
    total: cards.length,
    flipped,
    goNext,
    goPrev,
    toggleFlip,
    shuffle,
  };
}
