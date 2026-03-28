import { useState, useMemo } from "react";
import ExpenseForm from "../components/ExpenseForm";

export default function Expenses({ data, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [filterVehicle, setFilterVehicle] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const filtered = useMemo(() => {
    return data.expenses
      .filter((e) => filterVehicle === "all" || e.vehicleId === filterVehicle)
      .filter(
        (e) => filterCategory === "all" || e.categoryId === filterCategory
      )
      .filter((e) => !filterFrom || e.date >= filterFrom)
      .filter((e) => !filterTo || e.date <= filterTo)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [data.expenses, filterVehicle, filterCategory, filterFrom, filterTo]);

  const vehicleMap = Object.fromEntries(
    data.vehicles.map((v) => [v.id, v.name])
  );
  const categoryMap = Object.fromEntries(
    data.categories.map((c) => [c.id, c.label])
  );

  const fmt = (n) =>
    n.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €";

  const handleSubmit = (values) => {
    if (editing) {
      onUpdate({ ...values, id: editing.id });
      setEditing(null);
    } else {
      onAdd(values);
    }
    setShowForm(false);
  };

  const handleEdit = (e) => {
    setEditing(e);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Supprimer cette dépense ?")) onDelete(id);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ marginBottom: 0 }}>Dépenses</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          ➕ Ajouter
        </button>
      </div>

      <div className="filters-bar card">
        <div className="form-group">
          <label>Véhicule</label>
          <select
            value={filterVehicle}
            onChange={(e) => setFilterVehicle(e.target.value)}
          >
            <option value="all">Tous</option>
            {data.vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Catégorie</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Toutes</option>
            {data.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Du</label>
          <input
            type="date"
            value={filterFrom}
            onChange={(e) => setFilterFrom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Au</label>
          <input
            type="date"
            value={filterTo}
            onChange={(e) => setFilterTo(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>Aucune dépense trouvée</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Véhicule</th>
                  <th>Km</th>
                  <th>Catégorie</th>
                  <th>Opération</th>
                  <th>Montant</th>
                  <th>Fournisseur</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>{new Date(e.date).toLocaleDateString("fr-FR")}</td>
                    <td>{vehicleMap[e.vehicleId] || "—"}</td>
                    <td>{e.mileage.toLocaleString("fr-FR")}</td>
                    <td>{categoryMap[e.categoryId] || e.categoryId}</td>
                    <td>{e.operationName}</td>
                    <td className="amount">{fmt(e.amount)}</td>
                    <td>{e.supplier || "—"}</td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(e)}
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(e.id)}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? "Modifier la dépense" : "Nouvelle dépense"}</h2>
            <ExpenseForm
              vehicles={data.vehicles}
              categories={data.categories}
              initial={editing || undefined}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}