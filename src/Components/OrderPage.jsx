import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderPage({ selectedProducts, uahToUsdRate, onBack }) {
  const totalPriceUAH = selectedProducts.reduce((total, product) => total + product.priceUAH, 0);
  const totalPriceUSD = (totalPriceUAH * uahToUsdRate).toFixed(2);
  const navigate = useNavigate();

  const handleSubmitOrder = () => {
    alert("Order submitted!");
    onBack();
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Your Order</h2>
      {selectedProducts.length > 0 ? (
        selectedProducts.map((product) => (
          <div key={product.id}>
            <p>{product.name} by {product.author} - {product.priceUAH} UAH</p>
          </div>
        ))
      ) : (
        <p>No products selected</p>
      )}
      <h3>Total Price: {totalPriceUAH} UAH ({totalPriceUSD} USD)</h3>
      <button onClick={handleBack}>Back to Product List</button>
      <button onClick={handleSubmitOrder}>Submit</button>
    </div>
  );
}
