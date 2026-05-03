import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import AuthVerify from "./pages/AuthVerify";
import { useAppData } from "./hooks/useAppData";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  if (!token) return <Navigate to="/login" replace />;
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
    window.location.href = "/login";
  };

  return (
    <Layout userEmail={userEmail} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Dashboard data={data} />} />
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
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppContent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}