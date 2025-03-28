import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/auth/profile`, { withCredentials: true });
                console.log('✅ Profil geladen:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('🚨 Fehler beim Abrufen des Profils:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // 🛠️ Login-Handler
    const login = async (username, password) => {
        try {
            await axios.post(`${API_BASE_URL}/auth/login`, 
                { username, password }, 
                { withCredentials: true }
            );

            const response = await axios.get(`${API_BASE_URL}/auth/profile`, { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            console.error("❌ Fehler beim Login:", error);
            throw error;
        }
    };

    // 🛠️ Logout-Handler
    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error("❌ Fehler beim Logout:", error);
        }
    };

    if (loading) {
        return <p>Lädt...</p>;  // Ladeanzeige während der Session-Abruf läuft
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 🛠️ Hook zum einfachen Zugriff auf Auth-Daten
export const useAuth = () => useContext(AuthContext);
