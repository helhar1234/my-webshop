import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
    const [cartItems, setCartItems] = useState(null);

    const [address, setAddress] = useState({
        firstName: "",
        familyName: "",
        street: "",
        houseNumber: "",
        zip: "",
        city: ""
    });

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

export function useCheckout() {
    return useContext(CheckoutContext);
}
