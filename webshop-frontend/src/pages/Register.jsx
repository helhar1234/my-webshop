import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext für Auto-Login nach Registrierung

    const handleRegister = async () => {
        setLoading(true);
        setMessage("");

        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password
            }, { withCredentials: true });

            // Automatischer Login nach erfolgreicher Registrierung
            await login(username, password);
            navigate("/profile"); // Weiterleitung zum Profil

        } catch (error) {
            console.error("❌ Fehler bei der Registrierung:", error);
            setMessage(error.response?.data?.error || "Registrierung fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Registrieren</h1>
            <input 
                type="text" 
                placeholder="Benutzername" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Passwort" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button disabled={loading} onClick={handleRegister}>
                {loading ? "Registrieren..." : "Registrieren"}
            </button>

            {message && <p style={{ color: "red" }}>{message}</p>}
        </div>
    );
}

export default Register;
