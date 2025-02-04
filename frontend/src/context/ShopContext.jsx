import { createContext, useState } from "react";
import { product } from "../assets/assets"; // Ensure this path and export are correct
import {toast} from "react-toastify"

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";

  const [cartItems, setCartItems] = useState({})

  const [products, setProducts] = useState(product)
  const [searchTerm, setSearchTerm] = useState('')

  const updateSearchTerm = (term) => {
    setSearchTerm(term)
  }

  const addToCart = async(itemId, size) =>{
    if(!size){
      toast.error('Select product size to continue')
      return
    }

    const updatedCart = {...cartItems}
    if(!updatedCart[itemId]){
      updatedCart[itemId] = {[size] : 1}
    }
    else{
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1
    }

    setCartItems(updatedCart);

    console.log(`Product added to cart: ItemId - ${itemId}, size - ${size}`)

    toast.success(`Product added to cart`)

  }


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          totalCount += cartItems[items][item]
        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)

    cartData[itemId][size] = quantity;

    setCartItems(cartData)
  }

  const getCartAmount = () => {
    let totalAmount = 0

    for(const itemId in cartItems){
      const itemInfo = products.find((product) => product._id === itemId)

      if(itemInfo){
        for(const size in cartItems[itemId]){
          totalAmount += itemInfo.price * cartItems[itemId][size]
        }
      }
    }

    return totalAmount
  }

  const value = {
    products, cartItems, currency, searchTerm, updateSearchTerm, addToCart, getCartCount, updateQuantity, getCartAmount
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
