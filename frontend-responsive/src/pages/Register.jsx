import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Register() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Auto-Login nach Registrierung
  const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

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
      setMessage("Bitte füllen Sie alle Felder aus.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/auth/register`,
        { username, password },
        authHeader
      );
      await login(username, password);
      navigate("/profile");
    } catch (error) {
      console.error("❌ Fehler bei der Registrierung:", error);
      setMessage(
        error.response?.data?.error || "Registrierung fehlgeschlagen"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="register-container">
        <h1 className="register-title">Registrieren</h1>

        <div className="register-form">
          <input
            type="text"
            placeholder="Benutzername"
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
            disabled={loading}
            onClick={handleRegister}
          >
            {loading ? "Registrieren..." : "Registrieren"}
          </button>
          {message && <p className="register-error">{message}</p>}
        </div>

        <p className="register-register text-center mt-3">
          Bereits registriert? <Link to="/login">Hier einloggen</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
