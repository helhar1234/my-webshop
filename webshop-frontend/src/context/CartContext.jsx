import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🛠️ Warenkorb aus der Session laden
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
                setCart(response.data);
            } catch (error) {
                console.error("🚨 Fehler beim Abrufen des Warenkorbs:", error);
                setCart([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    // 🛠️ Produkt zum Warenkorb hinzufügen
    const addItem = async (productId, quantity) => {
        try {
            await axios.post("http://localhost:5000/api/cart/add", 
                { productId, quantity }, 
                { withCredentials: true }
            );

            const response = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
            setCart(response.data);
        } catch (error) {
            console.error("❌ Fehler beim Hinzufügen zum Warenkorb:", error);
        }
    };

    // 🛠️ Warenkorb leeren
    const clearCart = async () => {
        try {
            await axios.delete("http://localhost:5000/api/cart/clear", { withCredentials: true });
            setCart([]);
        } catch (error) {
            console.error("❌ Fehler beim Leeren des Warenkorbs:", error);
        }
    };

    if (loading) {
        return <p>Lädt...</p>;  // Ladeanzeige während der Warenkorb-Abruf läuft
    }

    return (
        <CartContext.Provider value={{ cart, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// 🛠️ Hook zum einfachen Zugriff auf den Warenkorb
export const useCart = () => useContext(CartContext);
