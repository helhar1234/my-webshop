import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();

  useEffect(() => {
    updateCart();
  }, [navigate, user]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);


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

      <div className="navbar__actions d-flex align-items-center gap-3">
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

        <div className="navbar__icons d-flex gap-3">
          {user ? (
            <>
              <Link to="/cart" className="navbar__cart-icon-wrapper">
                <img
                  src="/images/icons/cart-icon.png"
                  alt="Warenkorb"
                  className="navbar__icon bigger"
                />
                {cartItemCount > 0 && (
                  <span className="navbar__cart-badge">{cartItemCount}</span>
                )}
              </Link>
              <Link to="/profile">
                <img
                  src="/images/icons/profile-icon.png"
                  alt="Profil"
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

        <button
          className="navbar__hamburger d-md-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

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
            <li className="navbar__item mb-2">
              <div className="navbar__search-wrapper">
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

                <button className="navbar__search-btn" onClick={handleSearchIconClick}>
                  <img
                    src="/images/icons/search-icon.png"
                    alt="Search"
                    className="navbar__icon"
                  />
                </button>
              </div>

            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;