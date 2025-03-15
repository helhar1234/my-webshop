// CheckoutPayment.js
import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutPayment() {
    const { payment, setPayment } = useCheckout();
    const [localPayment, setLocalPayment] = useState(payment);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalPayment((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        // Zahlungsdaten aktualisieren
        setPayment(localPayment);
        // Weiter zur Zusammenfassung
        navigate("/checkout/summary");
    };

    return (
        <div>
            <h1>Zahlungsdaten</h1>
            <input
                name="cardNumber"
                placeholder="Kartennummer"
                value={localPayment.cardNumber}
                onChange={handleChange}
            />
            <input
                name="expiry"
                placeholder="Gültig bis (MM/YY)"
                value={localPayment.expiry}
                onChange={handleChange}
            />
            <input
                name="cvc"
                placeholder="CVC"
                value={localPayment.cvc}
                onChange={handleChange}
            />

            <button onClick={handleNext}>Weiter</button>
        </div>
    );
}

export default CheckoutPayment;
