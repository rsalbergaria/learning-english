import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { modules } from "./modules/registry.js";

// HashRouter em vez de BrowserRouter: o GitHub Pages não tem como
// reescrever rotas no servidor, então usar hash (#/flashcards) evita
// 404 ao dar refresh ou acessar uma rota direto pela URL.
export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<p className="empty-state">Carregando...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            {modules
              .filter((mod) => mod.enabled)
              .map((mod) => (
                <Route key={mod.id} path={mod.path} element={<mod.element />} />
              ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
}
