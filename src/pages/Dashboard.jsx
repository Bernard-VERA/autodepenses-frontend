import { useMemo, useState } from "react";

export default function Dashboard({ data }) {
  const [selectedVehicle, setSelectedVehicle] = useState("all");

  const filtered = useMemo(() => {
    if (selectedVehicle === "all") return data.expenses;
    return data.expenses.filter((e) => e.vehicleId === selectedVehicle);
  }, [data.expenses, selectedVehicle]);

  const totalExpenses = filtered.reduce((s, e) => s + e.amount, 0);

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const monthExpenses = filtered
    .filter((e) => e.date.startsWith(currentMonth))
    .reduce((s, e) => s + e.amount, 0);

  const costPerKm = useMemo(() => {
    const vehicles =
      selectedVehicle === "all"
        ? data.vehicles
        : data.vehicles.filter((v) => v.id === selectedVehicle);
    let totalCost = 0;
    let totalKm = 0;
    for (const v of vehicles) {
      const vExpenses = data.expenses.filter((e) => e.vehicleId === v.id);
      if (vExpenses.length === 0 || v.initialMileage == null) continue;
      const maxMileage = Math.max(...vExpenses.map((e) => e.mileage));
      const km = maxMileage - v.initialMileage;
      if (km > 0) {
        totalCost += vExpenses.reduce((s, e) => s + e.amount, 0);
        totalKm += km;
      }
    }
    return totalKm > 0 ? totalCost / totalKm : null;
  }, [data, selectedVehicle]);

  const byCategory = useMemo(() => {
    const map = {};
    for (const e of filtered) {
      map[e.categoryId] = (map[e.categoryId] || 0) + e.amount;
    }
    const max = Math.max(...Object.values(map), 1);
    return data.categories
      .map((c) => ({
        ...c,
        amount: map[c.id] || 0,
        pct: ((map[c.id] || 0) / max) * 100,
      }))
      .filter((c) => c.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }, [filtered, data.categories]);

  const fmt = (n) =>
    n.toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €";

  return (
    <div>
      <h1>Tableau de bord</h1>

      <div className="filters-bar">
        <div className="form-group">
          <label>Véhicule</label>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="all">Tous les véhicules</option>
            {data.vehicles.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card highlight">
          <div className="stat-label">Total des dépenses</div>
          <div className="stat-value">{fmt(totalExpenses)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Dépenses du mois</div>
          <div className="stat-value">{fmt(monthExpenses)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Coût par km</div>
          <div className="stat-value">
            {costPerKm != null ? `${costPerKm.toFixed(3)} €/km` : "—"}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Nb de dépenses</div>
          <div className="stat-value">{filtered.length}</div>
        </div>
      </div>

      <div className="card">
        <h2>Répartition par catégorie</h2>
        {byCategory.length === 0 ? (
          <p className="empty-state">Aucune dépense enregistrée</p>
        ) : (
          <ul className="category-list">
            {byCategory.map((c) => (
              <li key={c.id} className="category-item">
                <span className="category-label">{c.label}</span>
                <div className="category-bar-container">
                  <div
                    className="category-bar"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <span className="category-amount">{fmt(c.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}