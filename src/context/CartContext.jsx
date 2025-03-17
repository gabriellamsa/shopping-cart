import { allProducts } from "../assets/data";
import { createContext, useContext, useState } from "react";
import {
  getParsedItemFromStorage,
  setItemInStorage,
} from "../utilities/LocalStorageFns";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [allItems, setAllItems] = useState([]);

  const setItems = () => {
    setAllItems(allProducts);
  };

  const addToCart = (item) => {
    setAllItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, inCart: true } : prevItem
      )
    );
  };

  const removeFromCart = (item) => {
    setAllItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, inCart: false, quantity: 1 }
          : prevItem
      )
    );
  };

  const updateQuantity = (cartItem, amount) => {
    setAllItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
    );
  };

  const setLocalStorage = () => {
    const inCartItems = allItems.filter((item) => item.inCart);
    if (inCartItems.length) {
      setItemInStorage("cartItems", inCartItems);
    }
  };

  const setCartItemsFromStorage = () => {
    const storedItems = getParsedItemFromStorage("cartItems");
    if (storedItems) {
      setAllItems((prevItems) =>
        prevItems.map((item) => {
          const matchedItem = storedItems.find(
            (storageItem) => storageItem.id === item.id
          );
          return matchedItem ? matchedItem : item;
        })
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        allItems,
        setItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setLocalStorage,
        setCartItemsFromStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
