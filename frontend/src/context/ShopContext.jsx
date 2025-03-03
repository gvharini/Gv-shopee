import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App"; // Ensure this is correctly imported

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 0;

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

    if(token){
      try{
      await axios.post(backendUrl + '/api/cart/add', {itemId,size} , {headers:{token}})
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) => total + Object.values(sizes).reduce((subTotal, qty) => subTotal + qty, 0),
      0
    );
  };

  const updateQuantity = async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)

    cartData[itemId][size] = quantity;

    setCartItems(cartData)

      if(koten){
        try{
          await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})
        }catch(error){
          console.log(error)
          toast.error(error.message)

        }
      }
  }

  const getUserCart = async(token) => {
    try{
      const response = await axios.post(backendUrl + '/api/cart/get', {} , {headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    }catch(error){
      console.log(error)
          toast.error(error.message)
    }
  }

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

  useEffect(()=> {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  },[])

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
