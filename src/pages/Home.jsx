import { Link } from "react-router-dom";
import { modules } from "../modules/registry.js";

export default function Home() {
  return (
    <>
      <h1 className="page-title">Escolha um módulo para estudar</h1>
      <p className="page-subtitle">
        Site modular para estudar inglês. Cada card abaixo é uma feature independente.
      </p>

      <div className="module-grid">
        {modules.length === 0 && (
          <p className="empty-state">Nenhum módulo disponível ainda.</p>
        )}

        {modules.map((mod) => (
          <Link
            key={mod.id}
            to={mod.enabled ? mod.path : "#"}
            className={`module-card${mod.enabled ? "" : " disabled"}`}
          >
            <span className="icon">{mod.icon}</span>
            <h2>{mod.name}</h2>
            <p>{mod.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
