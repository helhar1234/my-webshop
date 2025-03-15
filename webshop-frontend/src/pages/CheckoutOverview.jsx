// CheckoutOverview.js
import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";

function CheckoutOverview() {
    const { cartItems } = useCheckout(); // Hier sind jetzt die echten CartItems
    const navigate = useNavigate();

    if (!cartItems) {
        return <p>Keine CartItems im Context!</p>;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

    return (
        <div>
            <h1>Checkout – Übersicht</h1>
            {cartItems.map((item, index) => (
                <p key={index}>
                    {item.product_name} – {item.product_price}€ x {item.quantity}
                </p>
            ))}
            <p>Gesamt: {totalPrice.toFixed(2)}€</p>
            <button onClick={() => navigate("/checkout/address")}>Weiter</button>
        </div>
    );
}

export default CheckoutOverview;
