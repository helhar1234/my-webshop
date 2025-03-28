import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCheckout } from "../context/CheckoutContext";

function Cart() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setCartItems } = useCheckout();
  const token = localStorage.getItem("token");
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios
      .get(`${API_BASE_URL}/cart`, authHeader)
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
      await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, authHeader);
      const response = await axios.get(`${API_BASE_URL}/cart`, authHeader);
      setCart(response.data);
    } catch (error) {
      console.error("❌ Fehler beim Entfernen des Produkts:", error);
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

  const startCheckout = () => {
    setCartItems(cart);
    navigate("/checkout/overview");
  };

  if (loading) {
    return <p>Lädt...</p>;
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="cart">
      <h1 className="cart__title">Warenkorb</h1>
      {cart.length === 0 ? (
        <p className="cart__empty">Dein Warenkorb ist leer.</p>
      ) : (
        <ul className="cart__list">
          {cart.map((item, index) => {
            const total = (item.product_price * item.quantity).toFixed(2);
            return (
              <li key={index} className="cart__item">
                <div className="cart__item-image">
                  <img
                    src={`/images/products/${item.product_name}.png`}
                    alt={item.product_name}
                    width="50"
                    height="40"
                  />
                </div>
                <div className="cart__item-info" onClick={() => handleProductClick(item.product_id)}>
                  <p className="cart__item-name">{item.product_name}</p>
                  <p className="cart__item-quantity">Menge: {item.quantity}</p>
                  <p className="cart__item-total">Gesamt: {total} €</p>
                </div>
                <button
                  className="cart__item-remove "
                  onClick={() => removeFromCart(item.product_id)}
                >
                  Entfernen
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="cart__summary">
            <p>Gesamtpreis: </p>
            <span className="cart__summary-amount">
              {cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0).toFixed(2)} €
            </span>
          </div>
          <div className="cart__actions">
            <button className="button button--danger" onClick={clearCart}>
              Warenkorb leeren
            </button>
            <button className="button button--primary" onClick={startCheckout}>
              Zur Kasse
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
