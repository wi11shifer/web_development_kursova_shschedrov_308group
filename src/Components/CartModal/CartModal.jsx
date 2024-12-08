//Components/CartModal/CartModal.jsx

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Input } from 'antd';
import { removeItem, updateItemQuantity, addItem } from '../../redux/slices/itemsSlice';

const CartModal = ({ isOpen, closeModal, isDarkTheme }) => {
  const dispatch = useDispatch();
  const selectedProducts = useSelector((state) => state.items.selectedItems || []);
  const [quantities, setQuantities] = React.useState({});

  const [orderSuccess, setOrderSuccess] = React.useState(false);

  React.useEffect(() => {
    const newQuantities = { ...quantities };
    selectedProducts.forEach((product) => {
      if (!(product.id in newQuantities)) {
        newQuantities[product.id] = 1;
      }
    });
    setQuantities(newQuantities);
  }, [selectedProducts]);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities({ ...quantities, [id]: newQuantity });
      dispatch(updateItemQuantity({ id, quantity: newQuantity }));
    }
  };

  const totalAmount = selectedProducts.reduce((total, product) => {
    return total + product.priceUAH * (quantities[product.id] || 1);
  }, 0);

  const handleOrderSuccess = () => {
    setOrderSuccess(true);
  };

  return (
    <Modal
      title="Your Cart"
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      className={isDarkTheme ? 'cart-modal dark-theme' : 'cart-modal'}
    >
      {selectedProducts.length > 0 ? (
        <>
          {selectedProducts.map((product) => (
            <div key={product.id} style={{ marginBottom: '20px' }}>
              <h4>{product.name} by {product.author}</h4>
              <p>Price: {product.priceUAH} UAH</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  type="number"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                  min="1"
                  style={{ width: '60px', marginRight: '10px' }}
                />
                <Button
                  size="small"
                  danger
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <h3>Total Amount: {totalAmount} UAH</h3>

          <div>
            <button onClick={handleOrderSuccess}>Proceed to order</button>
          </div>
          {orderSuccess && <div>Order placed successfully!</div>}

        </>
      ) : (
        <p>Your cart is empty.</p>
      )}

    </Modal>
  );
};

export default CartModal;
