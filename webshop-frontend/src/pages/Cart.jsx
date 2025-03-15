import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCheckout } from "../context/CheckoutContext";

function Cart() {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setCartItems } = useCheckout();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        axios.get("http://localhost:5000/api/cart", { withCredentials: true })
            .then((response) => {
                setCart(response.data);
            })
            .catch((error) => {
                console.error("🚨 Fehler beim Abrufen des Warenkorbs:", error);
                setCart([]);
            })
            .finally(() => setLoading(false));
    }, [navigate, user]);

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
                withCredentials: true
            });
            // Warenkorb erneut abrufen
            const response = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
            setCart(response.data);
        } catch (error) {
            console.error("❌ Fehler beim Entfernen des Produkts:", error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:5000/api/cart/clear", { withCredentials: true });
            setCart([]);
        } catch (error) {
            console.error("❌ Fehler beim Leeren des Warenkorbs:", error);
        }
    };

    // HIER: Klick auf "Zur Kasse" → Navigiere zur Checkout-Übersicht
    // und übergib den aktuellen Warenkorb per state
    const startCheckout = () => {
        // cart kommt aus deinem lokalen State (DB-Daten)
        setCartItems(cart); 
        // Danach zur Overview
        navigate("/checkout/overview");
    };

    if (loading) {
        return <p>Lädt...</p>;
    }

    return (
        <div>
            <h1>Warenkorb</h1>

            {cart.length === 0 ? (
                <p>Dein Warenkorb ist leer.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => {
                        const total = (item.product_price * item.quantity).toFixed(2);
                        return (
                            <li key={index}>
                                <div>
                                    <img
                                        src={`/images/products/${item.product_name}.png`}
                                        alt={item.product_name}
                                        width="50"
                                        height="40"
                                    />
                                </div>
                                <div>
                                    <p>Produkt: {item.product_name}</p>
                                    <p>Menge: {item.quantity}</p>
                                    <p>Preis pro Stück: {item.product_price} €</p>
                                    <p>Gesamt: {total} €</p>
                                </div>

                                <button onClick={() => removeFromCart(item.product_id)}>
                                    Entfernen
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {cart.length > 0 && (
                <>
                    <button onClick={clearCart}>Warenkorb leeren</button>
                    {/* Anstatt handleCheckout => Start Checkoutprozess */}
                    <button onClick={startCheckout}>Zur Kasse</button>
                </>
            )}
        </div>
    );
}

export default Cart;
