import { useState, useCallback, useEffect } from "react";
import {
  fetchVehicles,
  createVehicle,
  updateVehicle as apiUpdateVehicle,
  deleteVehicle as apiDeleteVehicle,
  fetchExpenses,
  createExpense,
  updateExpense as apiUpdateExpense,
  deleteExpense as apiDeleteExpense,
} from "../api";
import { defaultCategories } from "../data/defaults";

export function useAppData() {
  const [vehicles, setVehicles] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données au montage
  useEffect(() => {
    async function load() {
      try {
        const [v, e] = await Promise.all([fetchVehicles(), fetchExpenses()]);
        setVehicles(v);
        setExpenses(e);
      } catch (err) {
        console.error("Erreur chargement :", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const addVehicle = useCallback(async (v) => {
    const created = await createVehicle(v);
    setVehicles((prev) => [...prev, created]);
  }, []);

  const updateVehicle = useCallback(async (v) => {
    const updated = await apiUpdateVehicle(v._id, v);
    setVehicles((prev) => prev.map((x) => (x._id === v._id ? updated : x)));
  }, []);

  const removeVehicle = useCallback(
    async (id) => {
      const hasExpenses = expenses.some((e) => e.vehicleId === id);
      if (hasExpenses) {
        alert(
          "Impossible de supprimer : des dépenses sont associées à ce véhicule."
        );
        return;
      }
      await apiDeleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v._id !== id));
    },
    [expenses]
  );

  const addExpense = useCallback(async (e) => {
    const created = await createExpense(e);
    setExpenses((prev) => [...prev, created]);
  }, []);

  const updateExpense = useCallback(async (e) => {
    const updated = await apiUpdateExpense(e._id, e);
    setExpenses((prev) => prev.map((x) => (x._id === e._id ? updated : x)));
  }, []);

  const removeExpense = useCallback(async (id) => {
    await apiDeleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e._id !== id));
  }, []);

  const data = { vehicles, expenses, categories: defaultCategories };

  return {
    data,
    loading,
    addVehicle,
    updateVehicle,
    deleteVehicle: removeVehicle,
    addExpense,
    updateExpense,
    deleteExpense: removeExpense,
  };
}