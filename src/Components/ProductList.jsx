import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../ProductList.css';

function ProductList({ products, onProductSelect, selectedProducts }) {
  const navigate = useNavigate();

  const showProductDetail = (product) => {
    navigate(`/product/${product.id}`);
  };

  const showCategoryPage = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div>
      <h2>Product List</h2>
      <TransitionGroup component="ul">
        {products.map(product => (
          <CSSTransition
            key={product.id}
            timeout={300}
            classNames="product"
          >
            <li>
              <div
                className={`product-item ${selectedProducts && selectedProducts.some(p => p.id === product.id) ? 'selected' : ''}`}

              >
                <h3>{product.name}</h3>
                <p>Author: {product.author}</p>
                <p>Price: {product.priceUAH} UAH</p>
                <p>Category: {product.category}</p>
                <label>
                Select
                  <input 
                    type="checkbox" 
                    checked={selectedProducts && selectedProducts.some(p => p.id === product.id)} 
                    onChange={(e) => onProductSelect(product, e.target.checked)} 
                  />
                </label>
                <button onClick={() => showProductDetail(product)}>
                  View Details
                </button>
                <button onClick={() => showCategoryPage(product.category)}>
                  View Category
                </button>
              </div>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default ProductList;
