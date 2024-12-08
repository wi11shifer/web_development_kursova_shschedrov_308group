//Components/ProductList/ProductList.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Checkbox, Button, Select, Input } from 'antd';
import styles from './ProductList.module.css';

const { Option } = Select;

function ProductList({ products, onProductSelect, selectedProducts, onDeleteProduct, searchTerm, setSearchTerm, sortCriteria, handleSortChange }) {
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredProducts = products.filter(product => {
    const name = product.name || '';
    const author = product.author || '';
    const category = product.category || '';
    const price = product.priceUAH || 0;

    const matchesSearchTerm = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriceRange = (minPrice === '' || price >= minPrice) && (maxPrice === '' || price <= maxPrice);

    return matchesSearchTerm && matchesPriceRange;
  });

  const showCategoryPage = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginRight: '10px', height: 32 }}
        />

        <Input.Group compact style={{ marginBottom: '10px' }}>
          <Input
            style={{ width: '120px', height: 32 }}
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            style={{ width: '120px', height: 32 }}
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Input.Group>

        <div>
          <label htmlFor="sortSelect">Sort by: </label>
          <Select
            id="sortSelect"
            placeholder="Select an option"
            value={sortCriteria}
            onChange={handleSortChange}
            style={{ width: 120, marginRight: '10px' }}
          >
            <Option value="name">Name</Option>
            <Option value="price">Price</Option>
          </Select>
        </div>
      </div>

      <TransitionGroup component="ul">
        {filteredProducts.map(product => (
          <CSSTransition
            key={product.id}
            timeout={300}
            classNames="product"
          >
            <li>
              <div
                className={`product-item ${selectedProducts.some(p => p.id === product.id) ? 'selected' : ''}`}
                style={{ lignItems: 'center' }}
              >
                <img
                  src={product.coverUrl}
                  alt={`${product.name} cover`}
                  style={{ width: '100px', height: 'auto' }}
                />

                <div>
                  <h3>{product.name}</h3>
                  <p>Author: {product.author}</p>
                  <p>Price: {product.priceUAH} UAH</p>
                  <p>Category: {product.category}</p>

                  <label>
                    <Checkbox
                      checked={selectedProducts.some(p => p.id === product.id)}
                      onChange={(e) => onProductSelect(product, e.target.checked)}
                    >
                      Add to cart
                    </Checkbox>
                  </label>
                  <Button type="primary" onClick={() => showCategoryPage(product.category)}>
                    View Category
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </Button>

                </div>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default ProductList;
