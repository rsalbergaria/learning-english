// Descobre automaticamente todo deck em ./data/*.json e ./data/*.txt.
// Pra adicionar um deck novo: crie um arquivo em data/ (JSON ou TXT, veja
// utils/parseDeck.js) e ele aparece sozinho na lista — nada mais precisa mudar.

import { parseJsonDeck, parseTxtDeck } from "./utils/parseDeck.js";

function idFromPath(path) {
  return path.split("/").pop().replace(/\.(json|txt)$/, "");
}

function titleCaseFromId(id) {
  return id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const jsonFiles = import.meta.glob("./data/*.json", { eager: true });
const txtFiles = import.meta.glob("./data/*.txt", {
  eager: true,
  query: "?raw",
  import: "default",
});

const jsonDecks = Object.entries(jsonFiles).map(([path, mod]) => {
  const id = idFromPath(path);
  return { id, ...parseJsonDeck(mod.default, titleCaseFromId(id)) };
});

const txtDecks = Object.entries(txtFiles).map(([path, raw]) => {
  const id = idFromPath(path);
  return { id, ...parseTxtDeck(raw, titleCaseFromId(id)) };
});

export const decks = [...jsonDecks, ...txtDecks]
  .filter((deck) => deck.cards.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

export function getDeckById(id) {
  return decks.find((deck) => deck.id === id);
}
