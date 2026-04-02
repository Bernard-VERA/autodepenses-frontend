import { useState, useCallback, useEffect } from "react";
import { defaultData } from "../data/defaults";

const STORAGE_KEY = "carExpenseTrackerData";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted data, reset
  }
  return defaultData;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let globalId = Date.now();
function uid() {
  return (++globalId).toString(36);
}

export function useAppData() {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const addVehicle = useCallback((v) => {
    setData((prev) => ({
      ...prev,
      vehicles: [...prev.vehicles, { ...v, id: uid() }],
    }));
  }, []);

  const updateVehicle = useCallback((v) => {
    setData((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((x) => (x.id === v.id ? v : x)),
    }));
  }, []);

  const deleteVehicle = useCallback((id) => {
    setData((prev) => {
      const hasExpenses = prev.expenses.some((e) => e.vehicleId === id);
      if (hasExpenses) {
        alert(
          "Impossible de supprimer ce véhicule : des dépenses y sont associées. Supprimez-les d'abord."
        );
        return prev;
      }
      return { ...prev, vehicles: prev.vehicles.filter((v) => v.id !== id) };
    });
  }, []);

  const addExpense = useCallback((e) => {
    setData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, { ...e, id: uid() }],
    }));
  }, []);

  const updateExpense = useCallback((e) => {
    setData((prev) => ({
      ...prev,
      expenses: prev.expenses.map((x) => (x.id === e.id ? e : x)),
    }));
  }, []);

  const deleteExpense = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((e) => e.id !== id),
    }));
  }, []);

  return {
    data,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}