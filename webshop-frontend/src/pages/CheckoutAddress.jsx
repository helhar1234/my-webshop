// CheckoutAddress.js
import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutAddress() {
    const { address, setAddress } = useCheckout();
    const [localAddress, setLocalAddress] = useState(address);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        // Adresse im Context speichern
        setAddress(localAddress);
        // Weiter zur Zahlungsseite
        navigate("/checkout/payment");
    };

    return (
        <div>
            <h1>Lieferadresse</h1>
            
            <input
                name="firstName"
                placeholder="Vorname"
                value={localAddress.firstName}
                onChange={handleChange}
            />
            <input
                name="familyName"
                placeholder="Nachname"
                value={localAddress.familyName}
                onChange={handleChange}
            />
            <input
                name="street"
                placeholder="Straße"
                value={localAddress.street}
                onChange={handleChange}
            />
            <input
                name="houseNumber"
                placeholder="Hausnr."
                value={localAddress.houseNumber}
                onChange={handleChange}
            />
            <input
                name="zip"
                placeholder="PLZ"
                value={localAddress.zip}
                onChange={handleChange}
            />
            <input
                name="city"
                placeholder="Ort"
                value={localAddress.city}
                onChange={handleChange}
            />

            <button onClick={handleNext}>Weiter</button>
        </div>
    );
}

export default CheckoutAddress;
