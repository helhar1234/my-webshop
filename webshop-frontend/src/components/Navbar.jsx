import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // nur suchen, wenn ein Suchbegriff eingegeben wurde
        if (searchTerm.trim() !== "") {
            // navigiert zu /shop?search=...
            navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", borderBottom: "1px solid #ddd" }}>
            <div>
                <Link to="/">🛍 Webshop</Link>
            </div>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Suche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Suchen</button>
            </form>

            <ul style={{ display: "flex", gap: "1rem", listStyle: "none", alignItems: "center" }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                {user ? (
                    <>
                        <li>
                            <Link to="/profile">
                                <img src="/images/icons/profile-icon.png" alt="Profil" width="24" height="24" />
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <img src="/images/icons/cart-icon.png" alt="Warenkorb" width="24" height="24" />
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login">
                            <img src="/images/icons/profile-icon.png" alt="Login" width="24" height="24" />
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
