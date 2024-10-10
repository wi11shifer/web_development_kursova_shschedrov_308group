import React from 'react';

export default function CurrencyInput({ uahValue, usdValue, onUahChange, onUsdChange }) {
  return (
    <div className="currency-input">
      <h2>Enter Amount for Conversion</h2>
      <div>
        <label>UAH: </label>
        <input
          type="number"
          value={uahValue}
          onChange={(e) => onUahChange(e.target.value)}
          placeholder="Enter amount in UAH"
        />
      </div>
      <div>
        <label>USD: </label>
        <input
          type="number"
          value={usdValue}
          onChange={(e) => onUsdChange(e.target.value)}
          placeholder="Enter amount in USD"
        />
      </div>
    </div>
  );
}
