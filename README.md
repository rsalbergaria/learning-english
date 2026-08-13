# Learning English

Site estático, modular e sem login para estudar inglês, feito em **React + Vite**, hospedado no **GitHub Pages**.

A primeira feature (módulo) é **Flashcards**: vários decks de cartas, cada um com palavra em inglês na frente e tradução/exemplo no verso.

## Rodando localmente

```bash
npm install
npm run dev
```

O Vite abre em `http://localhost:5173/learning-english/` (o prefixo `/learning-english/` é o mesmo *base path* usado em produção, configurado em `vite.config.js`).

## Estrutura do projeto

```
src/
  modules/registry.js        # lista central de features do site (id, nome, ícone, rota, componente)
  pages/                      # páginas "de sistema" (Home, 404)
  components/                 # componentes compartilhados (Layout/header/footer)
  styles/global.css           # tema visual compartilhado
  features/
    flashcards/                  # uma feature = uma pasta
      FlashcardsFeature.jsx       # dono das sub-rotas da feature (lista de decks + estudo)
      FlashcardsHome.jsx          # tela de seleção de deck
      DeckPage.jsx                # tela de estudo (flip/anterior/próximo/embaralhar)
      decks.js                    # descobre automaticamente os arquivos em data/
      components/Flashcard.jsx    # componente do cartão (flip)
      hooks/useFlashcardDeck.js   # lógica de navegação/estado do deck
      data/general.json           # um deck
      data/phrasal-verbs.json     # outro deck
      data/idioms.txt             # outro deck, em formato .txt
      utils/parseDeck.js          # parsers dos dois formatos (json e txt)
```

### Como adicionar uma nova feature/módulo

1. Crie `src/features/<nome>/`.
2. Faça a página principal dela (ex: `<Nome>Page.jsx`).
3. Registre em `src/modules/registry.js`:
   ```js
   const MinhaFeaturePage = lazy(() => import("../features/minha-feature/MinhaFeaturePage.jsx"));

   export const modules = [
     // ...módulos existentes
     {
       id: "minha-feature",
       name: "Minha Feature",
       description: "...",
       icon: "✨",
       path: "/minha-feature",
       element: MinhaFeaturePage,
       enabled: true,
     },
   ];
   ```
4. Pronto — ela aparece automaticamente na home e a rota já funciona. Nenhum outro arquivo precisa mudar.

## Decks de flashcards

Cada arquivo dentro de `src/features/flashcards/data/` é um deck independente e aparece **automaticamente** na tela de seleção — não precisa registrar em nenhum outro lugar.

### Criando um deck em JSON

Crie `src/features/flashcards/data/<algum-nome>.json`:

```json
{
  "name": "Vocabulário Geral",
  "description": "Palavras e expressões do dia a dia.",
  "cards": [
    { "front": "ubiquitous", "back": "onipresente", "example": "Smartphones are ubiquitous in modern life." }
  ]
}
```

- `name`: nome do deck mostrado na lista
- `description` (opcional): subtítulo do card na lista
- `cards[].front`: palavra/expressão em inglês
- `cards[].back`: tradução
- `cards[].example` (opcional): frase de exemplo

### Criando um deck em TXT

Se preferir editar sem se preocupar com sintaxe JSON, crie `src/features/flashcards/data/<algum-nome>.txt`, uma carta por linha no formato `frente;verso;exemplo` (exemplo é opcional). As duas primeiras linhas podem definir nome/descrição do deck:

```
# name: Idioms
# description: Expressões idiomáticas comuns em inglês.

break the ice;quebrar o gelo;He told a joke to break the ice.
piece of cake;muito fácil / moleza;The test was a piece of cake.
```

Sem essas linhas, o nome do deck vira o nome do arquivo (ex: `phrasal-verbs.txt` → "Phrasal Verbs").

Veja `data/general.json`, `data/phrasal-verbs.json` e `data/idioms.txt` como exemplos prontos.

## Deploy no GitHub Pages

Já vem configurado com GitHub Actions (`.github/workflows/deploy.yml`): todo push na branch `main` builda o projeto e publica o conteúdo de `dist/` no Pages automaticamente.

Passos únicos, na primeira vez:

1. Suba este repositório para o GitHub com o nome **`learning-english`** (se usar outro nome, ajuste `base` em `vite.config.js` para `/<nome-do-repo>/`).
2. No repositório: **Settings → Pages → Source → GitHub Actions**.
3. Faça push na branch `main` — o workflow builda e publica sozinho.
4. O site fica disponível em `https://<seu-usuario>.github.io/learning-english/`.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (modo hash, para funcionar sem configuração de servidor no GitHub Pages)
- Sem backend, sem login, sem build de CSS extra — tudo estático.
