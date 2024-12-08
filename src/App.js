//App.js

import React, { useState, useContext } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Dropdown, Menu, Switch, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./styles.css";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ProductList from './Components/ProductList/ProductList';
import LoginModal from './Components/LoginModal/LoginModal';
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import { useStatus } from './hooks/useStatus';
import { useLogState } from './hooks/useLogState';
import { useHistoryTracker } from './hooks/useHistoryTracker';
import { OrderProvider } from './Contexts/OrderContext';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import AdminPage from './Components/AdminPage/AdminPage';
import ProductForm from './Components/ProductForm/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './redux/slices/itemsSlice';
import { HistoryProvider } from './Contexts/HistoryContext';
import HistoryPage from './Components/HistoryPage/HistoryPage';
import { AppProvider, AppContext } from './Contexts/AppContext';
import productsData from './data/products.json';

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state) => state.items.selectedItems || []);
  const { status: isModalOpen, toggleStatus: toggleModal } = useStatus();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uahToUsdRate] = useState(0.027);
  const [uahValue, setUahValue] = useState("");
  const [usdValue, setUsdValue] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { user, roles } = useContext(AppContext);
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleProductSelect = (product, isSelected) => {
    if (isSelected) {
      dispatch(addItem(product));
    } else {
      dispatch(removeItem(product.id));
    }
  };

  const toggleTheme = (checked) => {
    setIsDarkTheme(checked);
    document.body.classList.toggle('dark-theme', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
  };

  const handleLogin = (username) => {
    if (typeof username === 'string') {
      setIsLoggedIn(true);
      toggleModal();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleUpdateProduct = (updatedProducts) => {
    setProducts(updatedProducts);
  };
  
  

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    const sortedProducts = [...products].sort((a, b) => {
      if (criteria === 'price') return a.priceUAH - b.priceUAH;
      if (criteria === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
    setProducts(sortedProducts);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="primary" onClick={() => navigate('/admin')}>
          Admin Panel
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="primary" onClick={() => navigate('/add-product')} style={{ marginBottom: '10px' }}>
          Products Controll
        </Button>
      </Menu.Item>
      <Menu.Item key="3">
        <Button type="primary" onClick={() => navigate('/history')} style={{ marginBottom: '10px' }}>
          Navigation History
        </Button>
      </Menu.Item>
    </Menu>
  );


  return (
    <HistoryProvider>
      <AppProvider products={products}>
        <OrderProvider>
          <div className={isDarkTheme ? "App dark-theme" : "App"}>
            <Header isDarkTheme={isDarkTheme} isLoggedIn={isLoggedIn} toggleLogin={toggleModal} />

            <div style={{ margin: '16px' }}>
              <Switch checked={isDarkTheme} onChange={toggleTheme} checkedChildren="Dark" unCheckedChildren="Light" />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Dropdown overlay={menu} trigger={['click']}>
                <Button type="primary">
                  Technical Actions <DownOutlined />
                </Button>
              </Dropdown>
              <br></br>
              <Button type="primary" onClick={() => navigate('/')}> Home </Button>
            </div>

            <Routes>
              <Route path="/" element={
                <ProductList
                  products={products}
                  onProductSelect={handleProductSelect}
                  selectedProducts={selectedProducts}
                  onDeleteProduct={handleDeleteProduct}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortCriteria={sortCriteria}
                  handleSortChange={handleSortChange}
                />
              } />
<Route path="/product/:id" element={<ProductDetail />} />

              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route
                path="/add-product"
                element={<ProductForm onAddProduct={handleAddProduct} onUpdateProduct={handleUpdateProduct} products={products} />}
              />

              <Route path="/history" element={<HistoryPage />} />
            </Routes>
            <Footer />
            <LoginModal isOpen={isModalOpen} onClose={toggleModal} onLogin={handleLogin} />
          </div>
        </OrderProvider>
      </AppProvider>
    </HistoryProvider>
  );
};