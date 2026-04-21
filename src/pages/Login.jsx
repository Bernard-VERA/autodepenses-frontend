import { useState } from "react";
import { sendMagicLink } from "../api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await sendMagicLink(email);
            setSent(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="login-page">
                <div className="card login-card">
                    <h1>📧 Vérifiez votre boîte email</h1>
                    <p>
                        Un lien de connexion a été envoyé à <strong>{email}</strong>.
                    </p>
                    <p>Cliquez sur le lien dans l'email pour vous connecter.</p>
                    <p className="login-hint">Le lien expire dans 15 minutes.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="card login-card">
                <h1>🚗 Suivi Véhicule</h1>
                <p>Entrez votre email pour recevoir un lien de connexion :</p>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="vous@exemple.com"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Envoi en cours…" : "Envoyer le lien magique"}
                    </button>
                </form>
            </div>
        </div>
    );
}