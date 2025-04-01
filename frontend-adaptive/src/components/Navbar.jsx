import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
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
    <nav className="notebook-nav navbar">
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
        <button className="navbar__hamburger">☰</button>
      </div>
    </nav>
  );
}

export default Navbar;
