import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (token && email) {
            localStorage.setItem("authToken", token);
            localStorage.setItem("userEmail", email);
            navigate("/", { replace: true });
        } else {
            setError("Lien de connexion invalide.");
        }
    }, [searchParams, navigate]);

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