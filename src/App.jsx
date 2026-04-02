import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Vehicles from "./pages/Vehicles";
import { useAppData } from "./hooks/useAppData";

function App() {
  const {
    data,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useAppData();

  return (
    <BrowserRouter basename="/autodepenses-frontend"> // Ce texte - basename="/autodepenses-frontend" - sera a supprimer pour déployer sur Vercel. Il a été ajouté uniquement pour le déploiement sur Github Pages
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard data={data} />} />
          <Route
            path="/expenses"
            element={
              <Expenses
                data={data}
                onAdd={addExpense}
                onUpdate={updateExpense}
                onDelete={deleteExpense}
              />
            }
          />
          <Route
            path="/vehicles"
            element={
              <Vehicles
                data={data}
                onAdd={addVehicle}
                onUpdate={updateVehicle}
                onDelete={deleteVehicle}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;