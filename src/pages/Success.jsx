import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { removeItemFromStorage } from "../utilities/LocalStorageFns";

export const Success = () => {
  const { allItems, setAllItems } = useCart();

  useEffect(() => {
    const clearCart = () => {
      setAllItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          inCart: false,
          quantity: 1,
        }))
      );
      removeItemFromStorage("cartItems");
    };

    clearCart();
  }, [setAllItems]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>
        <a
          href="/"
          className="inline-block bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500 transition-colors"
        >
          Back to Shop
        </a>
      </div>
    </div>
  );
};
