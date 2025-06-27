import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { ShopContext } from '../../context/ShopContext';
import { MdDelete } from 'react-icons/md';
import CartTotal from '../../components/CardTotal/CartTotal';
import './cart.css';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    if (products.length === 0) return;

    if (!cartItems || typeof cartItems !== 'object') {
      setCartData([]);
      return;
    }

    const tempData = Object.entries(cartItems).flatMap(([itemId, sizes]) =>
      Object.entries(sizes)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          _id: itemId,
          size,
          quantity,
        }))
    );
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div>
      <div className="cart-content-container">
        {cartData.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            if (!productData) return null; // ✅ Ensure product exists before rendering

            return (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={productData.image?.[0] || '/placeholder.jpg'} // ✅ Handle missing image
                    alt={productData.name}
                    className="product-cart-image"
                  />
                  <div className="product-details-cart">
                    <p className="cart-product-name">{productData.name}</p>
                    <div className="product-price-size">
                      <p className='cart-product-price'>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="size">{item.size}</p>
                    </div>
                  </div>
                </div>

                <input
                  type="number"
                  className="quantity-input"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10) || 0;
                    if (newQuantity > 0) {
                      updateQuantity(item._id, item.size, newQuantity);
                    }
                  }}
                />

                <MdDelete
                  className="delete-icon"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && ( // ✅ Show checkout button only if cart is not empty
        <div className="check-container">
          <div className="checkout-box">
            <CartTotal />
            <div className='checkout-wrapper'>

            <div className="checkout-button-container">
              <button
                className="checkout-button"
                onClick={() => navigate('/checkout')} // ✅ Navigate to Checkout page
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
