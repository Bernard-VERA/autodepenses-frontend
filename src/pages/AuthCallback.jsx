import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthCallback() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(search);
        const token = params.get("token");
        const email = params.get("email");

        if (token && email) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", email);
            navigate("/", { replace: true });
        } else {
            setError("Lien de connexion invalide.");
        }
    }, [search, navigate]);

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

    return (
        <div className="login-page">
            <div className="card login-card">
                <p>Connexion en cours…</p>
            </div>
        </div>
    );
}
