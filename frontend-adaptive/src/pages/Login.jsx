import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    // Validierung: Beide Felder müssen ausgefüllt sein
    let valid = true;
    if (username.trim() === "") {
      setUsernameError(true);
      valid = false;
    } else {
      setUsernameError(false);
    }
    if (password.trim() === "") {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }
    if (!valid) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }
    try {
      await login(username, password);
      navigate("/profile");
    } catch (error) {
      setError("Fehler beim Login! Bitte überprüfen Sie Ihre Eingaben.");
      console.error("❌ Fehler beim Login:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (e.target.value.trim() !== "") setUsernameError(false);
          }}
          className={`input ${usernameError ? "error" : ""}`}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.trim() !== "") setPasswordError(false);
          }}
          className={`input ${passwordError ? "error" : ""}`}
          required
        />
        <button
          className="button button--primary login-button"
          onClick={handleLogin}
        >
          Login
        </button>

        {error && <p className="login-error">{error}</p>}

        <p className="login-register">
          Noch keinen Account? <Link to="/register">Hier registrieren</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;