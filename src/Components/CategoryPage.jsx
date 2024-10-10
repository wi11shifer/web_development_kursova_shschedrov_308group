import React, { useContext } from 'react';
import { AppContext } from '../Contexts/AppContext'; 
import { useParams, useNavigate } from 'react-router-dom';

function CategoryPage() {
  const { products } = useContext(AppContext);
  const { category } = useParams();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  if (!products) {
    return <p>Loading products...</p>;
  }

  const filteredProducts = products.filter(product => product.category === category);

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Books</h1>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.author}</p>
              <p>Price: {product.priceUAH} UAH</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found in this category.</p>
      )}
            <button onClick={handleBack}>Back to Product List</button>
    </div>
  );
}

export default CategoryPage;
