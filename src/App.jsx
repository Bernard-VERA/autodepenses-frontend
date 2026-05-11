import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import { useAppData } from "./hooks/useAppData";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Login />;
  }
  return children;
}

function AppContent() {
  const {
    data,
    loading,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useAppData();

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        Chargement…
      </div>
    );
  }

  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <Layout userEmail={userEmail} onLogout={handleLogout}>
      <Routes>
        {/* Dashboard accessible à tous */}
        <Route path="/" element={<Dashboard data={data} />} />

        {/* Pages protégées */}
        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <Vehicles
                data={data}
                onAdd={addVehicle}
                onUpdate={updateVehicle}
                onDelete={deleteVehicle}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses
                data={data}
                onAdd={addExpense}
                onUpdate={updateExpense}
                onDelete={deleteExpense}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Toutes les autres routes passent par AppContent */}
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
