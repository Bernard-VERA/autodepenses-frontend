import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { search } = useLocation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // On attend un cycle pour laisser React Router remplir search
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(search);
            const token = params.get("token");
            const email = params.get("email");

            if (token && email) {
                // On stocke le token AVANT de rediriger
                localStorage.setItem("authToken", token);
                localStorage.setItem("userEmail", email);

                // On attend un mini délai pour que ProtectedRoute voie le token
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 50);
            } else {
                setError("Lien de connexion invalide.");
            }

            setLoading(false);
        }, 50);

        return () => clearTimeout(timeout);
    }, [search, navigate]);

    if (loading) {
        return (
            <div className="login-page">
                <div className="card login-card">
                    <p>Connexion en cours…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="login-page">
                <div className="card login-card">
                    <h1>❌ Erreur</h1>
                    <p>{error}</p>
                    <a href="/login" className="btn btn-primary">
                        Retour à la connexion
                    </a>
                </div>
            </div>
        );
    }

    return null;
}
