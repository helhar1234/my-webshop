import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const executeSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
    setSearchActive(false);
  };

  const handleSearchIconClick = (e) => {
    e.preventDefault();
    if (!searchActive) {
      setSearchActive(true);
    } else {
      if (searchTerm.trim() !== "") {
        executeSearch(e);
      } else {
        setSearchActive(false);
      }
    }
  };

  const handleInputBlur = () => {
    if (searchTerm.trim() === "") {
      setSearchActive(false);
    }
  };

  return (
    <nav className="navbar container-fluid d-flex align-items-center justify-content-between">
      {/* Logo */}
      <div className="d-flex align-items-center gap-2">
        <Link to="/">
          <img
            src="/images/logos/logo_nav.png"
            alt="FreshLy Logo"
            className="navbar__brand-logo"
          />
        </Link>
        <Link to="/" className="navbar__brand-text d-none d-md-block">
          FreshLy
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="navbar__menu d-none d-md-flex">
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

      {/* Actions */}
      <div className="navbar__actions d-flex align-items-center gap-3">
        {/* Suchleiste nur auf md+ sichtbar */}
        <form
          onSubmit={executeSearch}
          className={`navbar__search d-none d-md-block ${searchActive ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="Suche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleInputBlur}
          />
        </form>

        <button className="navbar__search-btn d-none d-md-block" onClick={handleSearchIconClick}>
          <img
            src="/images/icons/search-icon.png"
            alt="Search"
            className="navbar__icon"
          />
        </button>

        {/* Icons (immer sichtbar) */}
        <div className="navbar__icons d-flex gap-3">
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

        {/* Hamburger (nur mobil sichtbar) */}
        <button
          className="navbar__hamburger d-md-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu Mobil */}
      {menuOpen && (
        <div className="navbar__mobile-menu d-md-none mt-2 w-100 bg-white border rounded p-3 position-absolute top-100 end-0 shadow">
          <ul className="list-unstyled mb-0">
            <li className="navbar__item mb-2">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="navbar__item mb-2">
              <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
            </li>
            <li className="navbar__item mb-2">
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;