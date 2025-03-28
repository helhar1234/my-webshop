import React from "react";

function QuantityCounter({ value, onChange, onDecrease, onIncrease }) {
  const handleChange = (e) => {
    let newVal = parseInt(e.target.value, 10);
    if (isNaN(newVal) || newVal <= 0) {
      newVal = 1;
    }
    onChange(newVal);
  };

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
