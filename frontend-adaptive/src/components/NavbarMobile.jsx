import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/shared/mobile/navbar.mobile.scss";
import { useCart } from "../context/CartContext";

function NavbarMobile() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();
  
  useEffect(() => {
      updateCart();
    }, [navigate, user]);
  
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const nav = navRef.current;
    const menu = menuRef.current;
    const toggle = toggleRef.current;

    if (!nav || !menu || !toggle) return;

    toggle.setAttribute("aria-expanded", isOpen);
    menu.hidden = !isOpen;
    nav.classList.toggle("nav--open", isOpen);

    const trapFocus = (e) => {
      if (!isOpen || e.ctrlKey || e.metaKey || e.altKey) return;

      const links = menu.querySelectorAll(".nav__link");
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === links[0]) {
          toggle.focus();
          e.preventDefault();
        } else if (document.activeElement === toggle) {
          links[0].focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);
  

  return (
    <div className="mobile-nav">
    <header className="mobile-header" role="banner">
      <nav id="nav" className="nav" role="navigation" ref={navRef}>
        <div className="nav__top">
          <Link to="/" className="nav__brand">
            <img src="/images/logos/logo_nav.png" alt="FreshLy Logo" className="nav__logo" />
            <span className="nav__brand-text">FreshLy</span>
          </Link>

          <div className="nav__icons">
            {user ? (
              <>
                <Link to="/profile">
                  <img src="/images/icons/profile-icon.png" alt="Profil" className="nav__icon" />
                </Link>
                <Link to="/cart" className="navbar__cart-icon-wrapper">
  <img src="/images/icons/cart-icon.png" alt="Warenkorb" className="nav__icon" />
  {cartItemCount > 0 && (
    <span class="cart-indicator"></span>
  )}
</Link>

              </>
            ) : (
              <Link to="/login">
                <img src="/images/icons/profile-icon.png" alt="Login" className="nav__icon" />
              </Link>
            )}
            <button
              className="nav__toggle"
              role="button"
              aria-controls="menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
              ref={toggleRef}
            >
              <svg className="menuicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <title>Toggle Menu</title>
                <g>
                  <line className="menuicon__bar" x1="13" y1="16.5" x2="37" y2="16.5" />
                  <line className="menuicon__bar" x1="13" y1="24.5" x2="37" y2="24.5" />
                  <line className="menuicon__bar" x1="13" y1="24.5" x2="37" y2="24.5" />
                  <line className="menuicon__bar" x1="13" y1="32.5" x2="37" y2="32.5" />
                  <circle className="menuicon__circle" r="23" cx="25" cy="25" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <ul
          className="nav__menu"
          id="menu"
          tabIndex="-1"
          aria-label="main navigation"
          hidden
          ref={menuRef}
        >
          <li className="nav__item"><Link to="/" className="nav__link" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li className="nav__item"><Link to="/shop" className="nav__link" onClick={() => setIsOpen(false)}>Shop</Link></li>
          <li className="nav__item"><Link to="/contact" className="nav__link" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li className="nav__item"><Link to="/about" className="nav__link" onClick={() => setIsOpen(false)}>About</Link></li>
        </ul>

        <div className="splash"></div>
      </nav>
    </header>
    </div>
  );
}

export default NavbarMobile;