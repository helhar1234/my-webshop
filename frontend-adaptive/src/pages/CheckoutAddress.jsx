import { useCheckout } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CheckoutAddress() {
  const { address, setAddress } = useCheckout();
  const [localAddress, setLocalAddress] = useState(address || {});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {};
    if (!localAddress.firstName || localAddress.firstName.trim() === "") {
      newErrors.firstName = true;
    }
    if (!localAddress.familyName || localAddress.familyName.trim() === "") {
      newErrors.familyName = true;
    }
    if (!localAddress.street || localAddress.street.trim() === "") {
      newErrors.street = true;
    }
    if (!localAddress.houseNumber || localAddress.houseNumber.trim() === "") {
      newErrors.houseNumber = true;
    }
    if (!localAddress.zip || !/^\d{4}$/.test(localAddress.zip)) {
      newErrors.zip = true;
    }
    if (!localAddress.city || localAddress.city.trim() === "") {
      newErrors.city = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setAddress(localAddress);
      navigate("/checkout/payment");
    }
  };

  return (
    <div className="checkout-container checkout-address">
      <h1 className="checkout-address__title">Lieferadresse</h1>
      <div className="address-form">
        <div className="input-group">
          <input
            name="firstName"
            placeholder="Vorname"
            value={localAddress.firstName || ""}
            onChange={handleChange}
            className={`input ${errors.firstName ? "error" : ""}`}
            required
          />
          <input
            name="familyName"
            placeholder="Nachname"
            value={localAddress.familyName || ""}
            onChange={handleChange}
            className={`input ${errors.familyName ? "error" : ""}`}
            required
          />
        </div>
        <div className="input-group">
          <input
            name="street"
            placeholder="Straße"
            value={localAddress.street || ""}
            onChange={handleChange}
            className={`input input--street ${errors.street ? "error" : ""}`}
            required
          />
          <input
            name="houseNumber"
            placeholder="Hausnr."
            value={localAddress.houseNumber || ""}
            onChange={handleChange}
            className={`input input--house ${errors.houseNumber ? "error" : ""}`}
            required
          />
        </div>
        <div className="input-group">
          <input
            name="zip"
            placeholder="PLZ"
            value={localAddress.zip || ""}
            onChange={handleChange}
            className={`input ${errors.zip ? "error" : ""}`}
            required
            pattern="\d{4}"
            maxLength="4"
          />
          <input
            name="city"
            placeholder="Ort"
            value={localAddress.city || ""}
            onChange={handleChange}
            className={`input ${errors.city ? "error" : ""}`}
            required
          />
        </div>
        <div className="checkout-address__actions">
          <button className="button button--danger" onClick={() => navigate("/")}>
            Abbrechen
          </button>
          <button className="button button--primary" onClick={handleNext}>
            Weiter
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutAddress;
