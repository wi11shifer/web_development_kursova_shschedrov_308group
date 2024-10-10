import React, { createContext, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';  
import "./styles.css";
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProductList from './Components/ProductList';
import OrderPage from './Components/OrderPage';
import LoginModal from './Components/LoginModal';
import CurrencyInput from './Components/CurrencyInput';
import CurrencyConverter from './Components/CurrencyConverter';
import CategoryPage from "./Components/CategoryPage";
import { useStatus } from './hooks/useStatus';
import { useLogState } from './hooks/useLogState';
import { useHistoryTracker } from './hooks/useHistoryTracker';
import { AppProvider } from './Contexts/AppContext';
import { OrderProvider } from './Contexts/OrderContext';
import ProductDetail from './Components/ProductDetail';


export default function App() {
  const navigate = useNavigate();
  const { status: isModalOpen, toggleStatus: toggleModal } = useStatus();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uahToUsdRate] = useState(0.027);
  const [uahValue, setUahValue] = useState("");
  const [usdValue, setUsdValue] = useState("");

  const products = [
    { id: 1, name: "Kobzar", author: "Taras Schevchenko", priceUAH: 500, category: "Historical" },
    { id: 2, name: "Shadows of Forgotten Ancestors", author: "Mykhailo Kotsiubynsky", priceUAH: 600, category: "Romance" },
    { id: 3, name: "The Black Council", author: "Panteleimon Kulish", priceUAH: 450, category: "Historical" }
  ];  

  useLogState(selectedProducts, "Selected Products");

  const handleProductSelect = (product, isSelected) => {
    if (isSelected) {
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    } else {
      setSelectedProducts((prevSelected) => prevSelected.filter((p) => p.id !== product.id));
    }
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    toggleModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleLogin = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      toggleModal();
    }
  };

  const proceedToOrder = () => {
    navigate('/orders');
  };

  const handleUahChange = (value) => {
    setUahValue(value);
    setUsdValue((value * uahToUsdRate).toFixed(2));
  };

  const handleUsdChange = (value) => {
    setUsdValue(value);
    setUahValue((value / uahToUsdRate).toFixed(2));
  };

  const { history } = useHistoryTracker();

  return (
    <AppProvider products={products}>
      <OrderProvider>
        <div className="App">
          <Header isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />

          <div>
            <h2>Navigation History</h2>
            <ul>
              {history.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </div>
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
<ProductList 
  products={products} 
  onProductSelect={handleProductSelect} 
  selectedProducts={selectedProducts} 
/>

                  <button onClick={proceedToOrder} disabled={selectedProducts.length === 0}>
                    Proceed to Order
                  </button>
                </div>
              } 
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<OrderPage selectedProducts={selectedProducts} uahToUsdRate={uahToUsdRate} />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
          
          <CurrencyInput
            uahValue={uahValue}
            usdValue={usdValue}
            onUahChange={handleUahChange}
            onUsdChange={handleUsdChange}
          />
          <CurrencyConverter uahValue={uahValue} usdValue={usdValue} />
          <Footer />
          <LoginModal isOpen={isModalOpen} onClose={toggleModal} onLogin={handleLogin} />
          </div>
      </OrderProvider>
    </AppProvider>
  );
}
