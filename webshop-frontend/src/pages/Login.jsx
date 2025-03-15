import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Login-Handler aus dem AuthContext nutzen

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate("/profile");
        } catch (error) {
            setError("Fehler beim Login! Bitte überprüfe deine Eingaben.");
            console.error("❌ Fehler beim Login:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Passwort" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>
                Noch keinen Account? <Link to="/register">Hier registrieren</Link>
            </p>
        </div>
    );
}

export default Login;
