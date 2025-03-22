import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutPayment() {
  const { payment, setPayment } = useCheckout();
  const [localPayment, setLocalPayment] = useState(payment || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
      newValue = newValue.match(/.{1,4}/g)?.join("-") || "";
    }
    if (name === "expiry") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
      if (newValue.length > 2) {
        newValue = newValue.slice(0, 2) + "/" + newValue.slice(2);
      }
    }
    if (name === "cvc") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }
    setLocalPayment((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    const rawCard = localPayment.cardNumber ? localPayment.cardNumber.replace(/-/g, "") : "";
    if (!rawCard || rawCard.length !== 16) {
      newErrors.cardNumber = true;
    }
    if (!localPayment.expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(localPayment.expiry)) {
      newErrors.expiry = true;
    }
    if (!localPayment.cvc || localPayment.cvc.length !== 3) {
      newErrors.cvc = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setPayment(localPayment);
      navigate("/checkout/summary");
    }
  };

  return (
    <div className="checkout checkout__container checkout__payment">
      <h1 className="checkout__title">Zahlungsdaten</h1>
      <div className="checkout__form">
        <input
          name="cardNumber"
          placeholder="Kartennummer"
          value={localPayment.cardNumber || ""}
          onChange={handleChange}
          className={`input ${errors.cardNumber ? "error" : ""}`}
          required
          maxLength="19"
        />
        <div className="checkout__form-group">
          <input
            name="expiry"
            placeholder="MM/YY"
            value={localPayment.expiry || ""}
            onChange={handleChange}
            className={`input ${errors.expiry ? "error" : ""}`}
            required
            maxLength="5"
          />
          <input
            name="cvc"
            placeholder="CVC"
            value={localPayment.cvc || ""}
            onChange={handleChange}
            className={`input ${errors.cvc ? "error" : ""}`}
            required
            maxLength="3"
          />
        </div>
        <div className="checkout__actions">
          <button className="button button--danger" onClick={() => navigate("/")}>Abbrechen</button>
          <button className="button button--primary" onClick={handleNext}>Weiter</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPayment;
