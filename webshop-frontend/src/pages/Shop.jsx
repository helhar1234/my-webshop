import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // <== useNavigate für Navigation
import axios from "axios";

function Shop() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search");

        if (searchQuery) {
            axios
                .get(`http://localhost:5000/api/search?query=${searchQuery}`)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => console.error("Fehler bei der Produktsuche:", error));
        } else {
            axios
                .get("http://localhost:5000/api/products")
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => console.error("Fehler beim Abrufen der Produkte:", error));
        }
    }, [location.search]);

    // Menge erhöhen
    const handleIncrease = (productId) => {
        setQuantities((prev) => {
            const current = prev[productId] ?? 1;
            return { ...prev, [productId]: Math.min(50, current + 1) };
        });
    };

    // Menge verringern
    const handleDecrease = (productId) => {
        setQuantities((prev) => {
            const current = prev[productId] ?? 1;
            return { ...prev, [productId]: Math.max(1, current - 1) };
        });
    };

    // In den Warenkorb
    const handleAddToCart = async (productId) => {
        const quantity = quantities[productId] ?? 1;
        try {
            await axios.post(
                "http://localhost:5000/api/cart/add",
                { productId, quantity },
                { withCredentials: true }
            );
            alert("Produkt zum Warenkorb hinzugefügt!");
        } catch (error) {
            console.error("Fehler beim Hinzufügen zum Warenkorb:", error);
        }
    };

    // Klick auf das Produkt-Div => Navigation zur Detailseite
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div>
            <h1>Shop</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                {products.map((product) => {
                    const quantity = quantities[product.id] ?? 1;

                    return (
                        <div
                            key={product.id}
                            style={{ border: "1px solid #ddd", padding: "1rem" }}
                            onClick={() => handleProductClick(product.id)}
                        >
                            <h2>{product.name}</h2>
                            <img
                                src={`/images/products/${product.name}.png`}
                                alt={product.name}
                                width="50"
                                height="40"
                            />
                            <p>{product.price}€</p>

                            {/* Buttons stoppen das Click-Event, damit das Div nicht den Klick abfängt */}
                            <div onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleDecrease(product.id)}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => handleIncrease(product.id)}>+</button>
                            </div>

                            <div onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => handleAddToCart(product.id)}>
                                    In den Warenkorb
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Shop;
