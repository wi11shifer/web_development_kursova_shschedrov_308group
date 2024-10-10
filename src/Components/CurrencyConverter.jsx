import React from "react";

export default function CurrencyConverter({ uahValue, usdValue }) {
    return (
        <div className="currency-converter-display">
          <h2>Currency Conversion Result</h2>
          <p>Amount in UAH: {uahValue} UAH</p>
          <p>Equivalent in USD: {usdValue} USD</p>
        </div>
      );
    }