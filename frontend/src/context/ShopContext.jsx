import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App"; // Ensure this is correctly imported

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 20;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size to continue");
      return;
    }

    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = { ...(updatedCart[itemId] || {}), [size]: (updatedCart[itemId]?.[size] || 0) + 1 };
      return updatedCart;
    });

    toast.success("Product added to cart");
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) => total + Object.values(sizes).reduce((subTotal, qty) => subTotal + qty, 0),
      0
    );
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const updatedCart = JSON.parse(JSON.stringify(prev));
      if (!updatedCart[itemId]) updatedCart[itemId] = {};
      updatedCart[itemId][size] = quantity;
      return updatedCart;
    });
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += Object.entries(sizes).reduce(
          (subTotal, [size, qty]) => subTotal + itemInfo.price * qty,
          0
        );
      }
      return totalAmount;
    }, 0);
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.product);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const value = {
    products,
    delivery_fee,
    cartItems,
    currency,
    searchTerm,
    updateSearchTerm,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken, // Removed navigate from context
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
