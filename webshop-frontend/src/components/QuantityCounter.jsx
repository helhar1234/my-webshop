import React from "react";

function QuantityCounter({ value, onChange, onDecrease, onIncrease }) {
  // Eingabewert anpassen, kein Wert unter 1
  const handleChange = (e) => {
    let newVal = parseInt(e.target.value, 10);
    if (isNaN(newVal) || newVal <= 0) {
      newVal = 1;
    }
    onChange(newVal); // ruft die Prop-Funktion aus dem Parent auf
  };

  // onClick={(e) => e.stopPropagation()} verhindert,
  // dass der Klick das Produkt-Div triggt
  return (
    <div className="quantityCounter" onClick={(e) => e.stopPropagation()}>
      <button className="quantityCounter__btn" onClick={onDecrease}>
        –
      </button>

      <input
        className="quantityCounter__input"
        type="number"
        min="1"
        value={value}
        onChange={handleChange}
      />

      <button className="quantityCounter__btn" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

export default QuantityCounter;
