import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Kobzar", author: "Taras Schevchenko", priceUAH: 500 },
    { id: 2, name: "Shadows of Forgotten Ancestors", author: "Mykhailo Kotsiubynsky", priceUAH: 600 },
    { id: 3, name: "The Black Council", author: "Panteleimon Kulish", priceUAH: 450 }
  ];

  const product = products.find(p => p.id === parseInt(id)); 

  const handleBack = () => {
    navigate("/");
  };
  
  const [comment, setComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
    alert(`Ваш відгук: «${comment}» додано успішно!`);
    setComment("");
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetail}>
      <h2>{product.name} by {product.author}</h2>
      <p>Price: {product.priceUAH} UAH</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
        />
        <button type="submit">Submit</button>
      </form>

      <button className={styles.backButton} onClick={handleBack}>Back to Product List</button>
    </div>
  );
}
