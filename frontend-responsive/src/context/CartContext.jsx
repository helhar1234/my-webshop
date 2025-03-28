import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/cart`, authHeader);
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

    const addItem = async (productId, quantity) => {
        try {
            await axios.post(`${API_BASE_URL}/cart/add`,
                { productId, quantity },
                authHeader
            );

            const response = await axios.get(`${API_BASE_URL}/cart`, authHeader);
            setCart(response.data);
        } catch (error) {
            console.error("❌ Fehler beim Hinzufügen zum Warenkorb:", error);
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/cart/clear`, authHeader);
            setCart([]);
        } catch (error) {
            console.error("❌ Fehler beim Leeren des Warenkorbs:", error);
        }
    };

    if (loading) {
        return <p>Lädt...</p>;
    }

    return (
        <CartContext.Provider value={{ cart, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
