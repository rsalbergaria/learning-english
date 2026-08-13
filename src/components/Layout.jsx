import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          📚 Learning English
        </Link>
        <nav>
          <Link to="/">Início</Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        Feito para estudar 🇺🇸 · hospedado no GitHub Pages
      </footer>
    </div>
  );
}
