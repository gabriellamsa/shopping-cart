import { useEffect } from "react";
import { CartItem } from "./components/CartItem";
import { useCart } from "./context/CartContext";
import { ShoppingCart } from "./components/ShoppingCart";
import { Success } from "./pages/Success";
import {
  getItemFromStorage,
  getParsedItemFromStorage,
} from "./utilities/LocalStorageFns";
import { Routes, Route } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Trend Alert
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Must-Have Outfits of the Season
          </p>
        </div>
      </header>

      <main className="container py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-8">
                <div className="flex justify-end">
                  <ShoppingCart />
                </div>

                <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-6">
                  {allItems?.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container py-6">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} Trend Alert. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
