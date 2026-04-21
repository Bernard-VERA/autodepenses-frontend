import { useState } from "react";
import VehicleForm from "../components/VehicleForm";

export default function Vehicles({ data, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSubmit = (values) => {
    if (editing) {
      onUpdate({ ...values, _id: editing._id });
      setEditing(null);
    } else {
      onAdd(values);
    }
    setShowForm(false);
  };

  const handleEdit = (v) => {
    setEditing(v);
    setShowForm(true);
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
        <h1 style={{ marginBottom: 0 }}>Véhicules</h1>
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

      {data.vehicles.length === 0 ? (
        <div className="card empty-state">
          <p>Aucun véhicule enregistré</p>
        </div>
      ) : (
        <div className="card" >
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Marque / Modèle</th>
                  <th>Année</th>
                  <th>Km initial</th>
                  <th>Prix d'achat</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.vehicles.map((v) => (
                  <tr key={v._id}>
                    <td style={{ fontWeight: 600 }}>{v.name}</td>
                    <td>
                      {[v.brand, v.model].filter(Boolean).join(" ") || "—"}
                    </td>
                    <td>{v.year || "—"}</td>
                    <td>
                      {v.initialMileage != null
                        ? v.initialMileage.toLocaleString("fr-FR") + " km"
                        : "—"}
                    </td>
                    <td className="amount">
                      {v.purchasePrice != null
                        ? v.purchasePrice.toLocaleString("fr-FR", {
                            minimumFractionDigits: 2,
                          }) + " €"
                        : "—"}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleEdit(v)}
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDelete(v._id)}
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
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? "Modifier le véhicule" : "Nouveau véhicule"}</h2>
            <VehicleForm
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