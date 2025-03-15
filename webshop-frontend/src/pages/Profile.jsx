import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const { user, logout, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1) Wenn kein User im Context ist, zum Login navigieren
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // 2) Beim ersten Rendern nochmal das Profil vom Backend holen
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/auth/profile",
                    { withCredentials: true }
                );
                console.log("✅ Profil geladen:", response.data);
                // User in den Context schreiben
                setUser && setUser(response.data);
            } catch (error) {
                console.error("🚨 Fehler beim Abrufen des Profils:", error);
                // Falls die Session ungültig ist, User zurücksetzen
                setUser && setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setUser]);

    // Falls noch geladen wird, Ladeanzeige zeigen
    if (loading) {
        return <p>Lädt...</p>;
    }

    // Wenn kein User vorhanden ist, Hinweis geben oder auf Login-Seite schicken
    if (!user) {
        return <p>Kein Nutzer eingeloggt. Bitte <a href="/login">einloggen</a>.</p>;
    }

    // Wenn User existiert, dessen Daten anzeigen
    return (
        <div>
            <h1>Profil</h1>
            <div>
                <p>
                    <strong>Benutzername:</strong> {user.username}
                </p>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
