# Learning English

Site estático, modular e sem login para estudar inglês, feito em **React + Vite**, hospedado no **GitHub Pages**.

A primeira feature (módulo) é **Flashcards**: um deck de cartas com palavra em inglês na frente e tradução/exemplo no verso.

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
    flashcards/                # uma feature = uma pasta
      FlashcardsPage.jsx        # página da feature
      components/Flashcard.jsx  # componente do cartão (flip)
      hooks/useFlashcardDeck.js # lógica de navegação/estado do deck
      data/words.json           # as palavras (fonte padrão)
      data/words.example.txt    # formato alternativo em .txt
      utils/parseDeck.js        # parsers para os dois formatos
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

## Editando os flashcards

Edite `src/features/flashcards/data/words.json`:

```json
{
  "deckName": "Vocabulário Geral",
  "cards": [
    { "front": "ubiquitous", "back": "onipresente", "example": "Smartphones are ubiquitous in modern life." }
  ]
}
```

- `front`: palavra/expressão em inglês
- `back`: tradução
- `example` (opcional): frase de exemplo

**Alternativa em `.txt`**: se preferir editar sem se preocupar com sintaxe JSON, use `src/features/flashcards/data/words.example.txt`, uma carta por linha no formato `frente;verso;exemplo`. Para ativar, troque `DATA_SOURCE` para `"txt"` no topo de `src/features/flashcards/FlashcardsPage.jsx`.

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
