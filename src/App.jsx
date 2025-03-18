import { useEffect } from "react";
import { CartItem } from "./components/CartItem";
import { useCart } from "./context/CartContext";
import { ShoppingCart } from "./components/ShoppingCart";
import { Success } from "./pages/Success";
import {
  getItemFromStorage,
  getParsedItemFromStorage,
} from "./utilities/LocalStorageFns";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const { allItems, setItems, setCartItemsFromStorage } = useCart();

  useEffect(() => {
    setItems();

    if (
      getParsedItemFromStorage("cartItems")?.length > 0 &&
      getItemFromStorage("cartItems") !== null
    ) {
      setCartItemsFromStorage();
    }
  }, []);

  useEffect(() => {
    console.log(allItems);
  }, [allItems]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="grid place-items-center py-16">
              <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl italic text-gray-500 mb-20 px-6 text-center leading-snug">
                Trend Alert: Must-Have Outfits of the Season
              </h1>
              <ShoppingCart />
              <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-8 xl:px-8 px-6">
                {allItems?.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          }
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}
