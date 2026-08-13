import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="page-title">Página não encontrada</h1>
      <p className="page-subtitle">
        <Link to="/">Voltar para a home</Link>
      </p>
    </>
  );
}
