// Components/CategoryPage/CategoryPage.jsx

import React, { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function CategoryPage() {
  const { products } = useContext(AppContext);
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <h2>Category: {category}</h2>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Author: {product.author}</p>
              <p>Price: {product.priceUAH} UAH</p>
              <Button
                type="primary"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View Details
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;
