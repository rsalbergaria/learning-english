// Suporta dois formatos de deck: JSON (objeto { deckName, cards }) ou
// TXT (uma carta por linha: "frente;verso;exemplo"). Escolha o que for
// mais confortável de manter — veja FlashcardsPage.jsx para trocar a fonte.

export function parseJsonDeck(raw) {
  const deckName = raw?.deckName ?? "Deck";
  const cards = Array.isArray(raw?.cards) ? raw.cards : [];
  return {
    deckName,
    cards: cards
      .filter((c) => c && c.front && c.back)
      .map((c) => ({ front: c.front, back: c.back, example: c.example ?? "" })),
  };
}

export function parseTxtDeck(raw, deckName = "Deck") {
  const cards = raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [front, back, example = ""] = line.split(";").map((part) => part.trim());
      return { front, back, example };
    })
    .filter((c) => c.front && c.back);

  return { deckName, cards };
}
