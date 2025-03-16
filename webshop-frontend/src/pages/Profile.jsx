import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const { user, logout, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          { withCredentials: true }
        );
        console.log("Profile loaded:", response.data);
        setUser && setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser && setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  if (loading) {
    return <p>Lädt...</p>;
  }

  if (!user) {
    return <p>Kein Nutzer eingeloggt. Bitte <a href="/login">einloggen</a>.</p>;
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <img
          src="/images/icons/profile-icon.png"
          alt="Profil"
          className="profile__image"
        />
        <h1 className="profile__title">Profil</h1>
      </div>
      <div className="profile__info">
        <p>
          <strong>Benutzername:</strong> {user.username}
        </p>
        <button className="button button--danger profile__logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
