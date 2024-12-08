import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { Input, Button, Table } from 'antd';
import * as Yup from 'yup';
import { AppContext } from '../../Contexts/AppContext';
import productsData from '../../data/products.json';

const ProductSchema = Yup.object().shape({
  productName: Yup.string().required('Product name is required'),
  productPrice: Yup.number()
    .min(1, 'Price must be at least 1 UAH')
    .max(100000, 'Price must not exceed 100000 UAH')
    .required('Price is required'),
  productCoverUrl: Yup.string().url('Invalid URL').required('Cover image URL is required'),
});

const CustomInputField = ({ label, name, ...props }) => {
  const { touched, errors } = useFormikContext();
  return (
    <div>
      <label>{label}</label>
      <Field as={Input} name={name} {...props} />
      {touched[name] && errors[name] && <div style={{ color: 'red' }}>{errors[name]}</div>}
    </div>
  );
};

export default function ProductForm({ onAddProduct, onUpdateProduct }) {
  const { user, roles } = useContext(AppContext);
  const { products, setProducts } = useContext(AppContext);

  const handleEditProduct = (id, field, value) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [field]: value } : product
    );
  
    setProducts(updatedProducts);
    onUpdateProduct(updatedProducts);
  };
  
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    onUpdateProduct(updatedProducts);
    alert('Product deleted successfully!');
  };

  const handleSaveChanges = () => {
    alert('Products updated successfully!');
  };

  if (user?.role !== roles.admin && user?.role !== roles.editor) {
    return <p>Access denied: Admins and Editors only</p>;
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEditProduct(record.id, 'name', e.target.value)}
        />
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEditProduct(record.id, 'author', e.target.value)}
        />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEditProduct(record.id, 'category', e.target.value)}
        />
      ),
    },
    {
      title: 'Price (UAH)',
      dataIndex: 'priceUAH',
      key: 'priceUAH',
      render: (text, record) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => handleEditProduct(record.id, 'priceUAH', e.target.value)}
        />
      ),
    },
    {
      title: 'Cover URL',
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => handleEditProduct(record.id, 'coverUrl', e.target.value)}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="danger"
          onClick={() => handleDeleteProduct(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Formik
        initialValues={{
          productName: '',
          productPrice: '',
          productAuthor: '',
          productCategory: '',
          productCoverUrl: '',
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, { resetForm }) => {
          const newProduct = {
            id: products.length + 1,
            name: values.productName,
            priceUAH: values.productPrice,
            author: values.productAuthor,
            category: values.productCategory,
            coverUrl: values.productCoverUrl,
          };

          onAddProduct(newProduct);
          setProducts([...products, newProduct]);
          resetForm();
          alert(
            `Book added: ${newProduct.name}, author: ${newProduct.author}, price: ${newProduct.priceUAH} UAH`
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Add new Book</h2>
            <CustomInputField label="Book Title" name="productName" placeholder="Enter book title" />
            <CustomInputField label="Book Author" name="productAuthor" placeholder="Enter book author's name" />
            <CustomInputField label="Book Category" name="productCategory" placeholder="Enter book's category" />
            <CustomInputField label="Book Price" name="productPrice" placeholder="Enter book price" />
            <CustomInputField label="Cover Image URL" name="productCoverUrl" placeholder="Enter cover image URL" />
            <Button
              type="primary"
              htmlType="submit"
              disabled={isSubmitting}
              style={{ marginTop: '10px' }}
            >
              Add Product
            </Button>
          </Form>
        )}
      </Formik>

      <h2 style={{ marginTop: '20px' }}>Edit Books</h2>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ marginBottom: '20px' }}
      />
      <Button type="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </div>
  );
}
