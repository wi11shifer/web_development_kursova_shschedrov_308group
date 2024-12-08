// Components/ProductDetail/ProductDetail.jsx

import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Contexts/AppContext';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { products } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(id, 10));
  
  console.log('ProductDetail products:', products);
  console.log('ProductDetail product:', product);
  const handleBack = () => {
    navigate('/');
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetail}>
      <h2>{product.name} by {product.author}</h2>
      <img
        src={product.coverUrl}
        alt={`${product.name} cover`}
        className={styles.bookCover}
        style={{ width: '200px', height: 'auto', marginBottom: '20px' }}
      />
      <p>Price: {product.priceUAH} UAH</p>

      <Formik
        initialValues={{ comment: '' }}
        onSubmit={(values, { resetForm }) => {
          alert(`Ваш відгук: «${values.comment}» додано успішно!`);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={Input.TextArea}
              name="comment"
              placeholder="Leave a comment"
              rows={4}
            />
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              style={{ marginTop: '10px' }}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <Button
        type="default"
        onClick={handleBack}
        className={styles.backButton}
        style={{ marginTop: '10px' }}
      >
        Back to Product List
      </Button>
    </div>
  );
}
