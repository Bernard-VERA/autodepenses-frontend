import { NavLink } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-brand">
          <span role="img" aria-label="voiture">🚗</span>
          <span>AutoDépenses</span>
        </div>
        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            📊 Tableau de bord
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🧾 Dépenses
          </NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            🚗 Véhicules
          </NavLink>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        AutoDépenses © {new Date().getFullYear()}
      </footer>
    </div>
  );
}