// Suporta dois formatos de arquivo de deck: JSON (objeto { name, description, cards })
// ou TXT (uma carta por linha: "frente;verso;exemplo"). Cada arquivo em
// src/features/flashcards/data/ vira um deck automaticamente — veja decks.js.

export function parseJsonDeck(raw, fallbackName = "Deck") {
  const name = raw?.name ?? fallbackName;
  const description = raw?.description ?? "";
  const cards = Array.isArray(raw?.cards) ? raw.cards : [];
  return {
    name,
    description,
    cards: cards
      .filter((c) => c && c.front && c.back)
      .map((c) => ({ front: c.front, back: c.back, example: c.example ?? "" })),
  };
}

// Linhas "# name: ..." e "# description: ..." no topo do arquivo são opcionais;
// sem elas, o nome do deck vem do nome do arquivo (veja decks.js).
export function parseTxtDeck(raw, fallbackName = "Deck") {
  let name = fallbackName;
  let description = "";
  const cardLines = [];

  for (const rawLine of raw.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const nameMatch = line.match(/^#\s*name:\s*(.+)$/i);
    if (nameMatch) {
      name = nameMatch[1].trim();
      continue;
    }

    const descriptionMatch = line.match(/^#\s*description:\s*(.+)$/i);
    if (descriptionMatch) {
      description = descriptionMatch[1].trim();
      continue;
    }

    if (line.startsWith("#")) continue;
    cardLines.push(line);
  }

  const cards = cardLines
    .map((line) => {
      const [front, back, example = ""] = line.split(";").map((part) => part.trim());
      return { front, back, example };
    })
    .filter((c) => c.front && c.back);

  return { name, description, cards };
}
