import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⬇️ Token aus localStorage holen
  const token = localStorage.getItem("token");

  // 🔐 Token-Header vorbereiten
  const authHeaders = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  // 📥 Profil beim Laden prüfen
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/profile`, authHeaders);
        console.log("✅ Profil geladen:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("🚨 Fehler beim Abrufen des Profils:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🟢 Login → Token speichern
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", data.token);

      const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });

      setUser(profileResponse.data);
    } catch (error) {
      console.error("❌ Fehler beim Login:", error);
      throw error;
    }
  };

  // 🔴 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) return <p>Lädt...</p>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
