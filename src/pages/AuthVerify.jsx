import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function AuthVerify() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      // Rediriger vers le backend pour vérification
      window.location.href = `${import.meta.env.API_URI}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`;
    }
  }, [searchParams]);

  return (
    <div className="login-page">
      <div className="card login-card">
        <p>Vérification en cours…</p>
      </div>
    </div>
  );
}