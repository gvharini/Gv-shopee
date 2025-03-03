import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import CartTotal from "../../components/CardTotal/CartTotal";
import "./Checkout.css";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../App";

const Checkout = () => {
  const [method, setMethod] = useState("cod");
  const { cartItems, setCartItems, getCartAmount, delivery_fee, products, token } =
    useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );

            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + '/api/order/place' ,
            orderData,
            {headers: {token}}
          );
          console.log(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <form className="shipping-form" onSubmit={onSubmitHandler}>
        {/* Payment Options */}
        <div className="payment-options">
          <button 
            type="button" 
            onClick={() => setMethod("cod")} 
            className={`payment-button ${method === "cod" ? "active" : ""}`}
          >
            ONLY CASH ON DELIVERY
          </button>
        </div>

        {/* Shipping Address Section */}
        <div className="shipping-form">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={onChangeHandler}
            required
          />
          </div>
          <div className="form-group">
          <input
            type="text"
            name="street"
            value={formData.street}
            placeholder="Street Address"
            onChange={onChangeHandler}
            required
          />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="City"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              placeholder="State"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              placeholder="Zip Code"
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              placeholder="Country"
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={onChangeHandler}
            required
          />
          </div>
          
        </div>

        {/* Order Summary & Place Order Button */}
        <div className="cart-totals">
          <CartTotal />
          <button className="place-order-button" type="submit">
            PLACE ORDER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
