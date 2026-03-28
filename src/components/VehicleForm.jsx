import { useState } from "react";

export default function VehicleForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [brand, setBrand] = useState(initial?.brand || "");
  const [model, setModel] = useState(initial?.model || "");
  const [year, setYear] = useState(initial?.year?.toString() || "");
  const [purchaseDate, setPurchaseDate] = useState(initial?.purchaseDate || "");
  const [purchasePrice, setPurchasePrice] = useState(
    initial?.purchasePrice?.toString() || ""
  );
  const [initialMileage, setInitialMileage] = useState(
    initial?.initialMileage?.toString() || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Le nom est obligatoire.");
    onSubmit({
      name: name.trim(),
      brand: brand.trim() || undefined,
      model: model.trim() || undefined,
      year: year ? parseInt(year) : undefined,
      purchaseDate: purchaseDate || undefined,
      purchasePrice: purchasePrice ? parseFloat(purchasePrice) : undefined,
      initialMileage: initialMileage ? parseInt(initialMileage) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nom du véhicule *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Ex: Ma Clio"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Marque</label>
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Ex: Renault"
          />
        </div>
        <div className="form-group">
          <label>Modèle</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Ex: Clio V"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Année</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2021"
          />
        </div>
        <div className="form-group">
          <label>Date d'achat</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Prix d'achat (€)</label>
          <input
            type="number"
            step="0.01"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Kilométrage initial</label>
          <input
            type="number"
            value={initialMileage}
            onChange={(e) => setInitialMileage(e.target.value)}
          />
        </div>
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