// CheckoutContext.js
import { createContext, useContext, useState } from "react";

// Ein einfacher Context, der die Checkout-Daten im State hält
const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
    // Beispiel: cartItems wären normalerweise aus deinem Warenkorb,
    // hier nur als Demo fest codiert
    const [cartItems, setCartItems] = useState(null);

    // State für Adresse
    const [address, setAddress] = useState({
        firstName: "",
        familyName: "",
        street: "",
        houseNumber: "",
        zip: "",
        city: ""
    });

    // State für Zahlungsinfo
    const [payment, setPayment] = useState({
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    return (
        <CheckoutContext.Provider
            value={{
                cartItems,
                setCartItems,
                address,
                setAddress,
                payment,
                setPayment
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

// Hilfsfunktion zum Zugriff auf die Checkout-Daten
export function useCheckout() {
    return useContext(CheckoutContext);
}
