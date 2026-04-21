import { useState } from "react";

export default function ExpenseForm({
  vehicles,
  categories,
  initial,
  onSubmit,
  onCancel,
}) {
  const [vehicleId, setVehicleId] = useState(
    initial?.vehicleId || (vehicles[0]?._id ?? "")
  );
  const [date, setDate] = useState(
    initial?.date || new Date().toISOString().slice(0, 10)
  );
  const [mileage, setMileage] = useState(initial?.mileage?.toString() || "");
  const [categoryId, setCategoryId] = useState(
    initial?.categoryId || categories[0]?.id || ""
  );
  const [operationName, setOperationName] = useState(
    initial?.operationName || ""
  );
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [supplier, setSupplier] = useState(initial?.supplier || "");
  const [comment, setComment] = useState(initial?.comment || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleId) return alert("Sélectionnez un véhicule.");
    if (!date) return alert("La date est obligatoire.");
    if (!categoryId) return alert("Sélectionnez une catégorie.");
    if (!amount || isNaN(parseFloat(amount)))
      return alert("Le montant doit être un nombre.");
    onSubmit({
      vehicleId,
      date,
      mileage: parseInt(mileage) || 0,
      categoryId,
      operationName: operationName.trim(),
      amount: parseFloat(amount),
      supplier: supplier.trim() || undefined,
      comment: comment.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Véhicule *</label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          >
            {vehicles.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Kilométrage</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            placeholder="Ex: 45200"
          />
        </div>
        <div className="form-group">
          <label>Catégorie *</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Nom de l'opération</label>
        <input
          value={operationName}
          onChange={(e) => setOperationName(e.target.value)}
          placeholder="Ex: Plein SP95"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Montant (€) *</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="72.50"
          />
        </div>
        <div className="form-group">
          <label>Fournisseur</label>
          <input
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Ex: TotalEnergies"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Commentaire</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          placeholder="Notes..."
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initial ? "Enregistrer" : "Ajouter"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}