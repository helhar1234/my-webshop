import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  // Führt die Suche aus und klappt die Suchleiste zusammen
  const executeSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
    setSearchActive(false);
  };

  // Beim Klick auf das Such-Icon:
  const handleSearchIconClick = (e) => {
    e.preventDefault();
    // Wenn die Suchleiste nicht aktiv ist, öffne sie
    if (!searchActive) {
      setSearchActive(true);
    } else {
      // Ist sie aktiv und das Feld nicht leer → suche ausführen
      if (searchTerm.trim() !== "") {
        executeSearch(e);
      } else {
        // Ist sie aktiv aber leer, klappe sie wieder zusammen
        setSearchActive(false);
      }
    }
  };

  // Beim Verlassen des Input-Feldes, falls es leer ist, zusammenklappen
  const handleInputBlur = () => {
    if (searchTerm.trim() === "") {
      setSearchActive(false);
    }
  };

  return (
    <nav className="notebook-nav navbar">
      {/* Brand-Bereich */}
      <div className="navbar__brand">
        <img
          src="/images/logos/logo_nav.png"
          alt="FreshLy Logo"
          className="navbar__brand-logo"
        />
        <Link to="/" className="navbar__brand-text">
          FreshLy
        </Link>
      </div>

      {/* Menü */}
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="navbar__item">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Actions: Suchleiste, Such-Button & Icons */}
      <div className="navbar__actions">
        <form
          onSubmit={executeSearch}
          className={`navbar__search ${searchActive ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="Suche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleInputBlur}
          />
        </form>
        <button
          className="navbar__search-btn"
          onClick={handleSearchIconClick}
        >
          <img
            src="/images/icons/search-icon.png"
            alt="Search"
            className="navbar__icon"
          />
        </button>
        <div className="navbar__icons">
          {user ? (
            <>
              <Link to="/profile">
                <img
                  src="/images/icons/profile-icon.png"
                  alt="Profil"
                  className="navbar__icon bigger"
                />
              </Link>
              <Link to="/cart">
                <img
                  src="/images/icons/cart-icon.png"
                  alt="Warenkorb"
                  className="navbar__icon bigger"
                />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <img
                src="/images/icons/profile-icon.png"
                alt="Login"
                className="navbar__icon bigger"
              />
            </Link>
          )}
        </div>
        <button className="navbar__hamburger">☰</button>
      </div>
    </nav>
  );
}

export default Navbar;
