// CheckoutSummary.js
import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutSummary() {
    // Warenkorb & andere Checkout-Daten aus dem Context
    const { cartItems, address, payment } = useCheckout();
    const navigate = useNavigate();

    // Falls cartItems fehlen oder leer sind, Abbruch
    if (!cartItems || cartItems.length === 0) {
        return <p>Keine Artikel im Checkout vorhanden.</p>;
    }

    // Gesamtpreis berechnen
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );

    // Checkout-Request ans Backend schicken
    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/checkout",
                { cart: cartItems },       // <== wir schicken cartItems
                { withCredentials: true }
            );
            alert(response.data.message);
            // Hier könntest du ggf. den Context leeren oder auf eine Danke-Seite leiten:
            navigate("/");
        } catch (error) {
            console.error("❌ Fehler beim Checkout:", error);
        }
    };

    return (
        <div>
            <h1>Zusammenfassung</h1>

            <h2>Produkte</h2>
            {cartItems.map((item, index) => (
                <div key={index}>
                    {item.product_name} – {item.product_price}€ x {item.quantity}
                </div>
            ))}
            <p>Gesamt: {totalPrice.toFixed(2)}€</p>

            <h2>Lieferadresse</h2>
            <p>{address.name}</p>
            <p>
                {address.street} {address.houseNumber}
            </p>
            <p>
                {address.zip} {address.city}
            </p>

            <h2>Zahlungsdaten</h2>
            <p>Kartennummer: {payment.cardNumber}</p>
            <p>Gültig bis: {payment.expiry}</p>
            <p>CVC: {payment.cvc}</p>

            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default CheckoutSummary;
