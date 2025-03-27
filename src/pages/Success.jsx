import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { removeItemFromStorage } from "../utilities/LocalStorageFns";
import { CheckCircle2, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="card max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>
        </div>

        <div className="pt-4">
          <a
            href="/"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </a>
        </div>
      </div>
    </div>
  );
};
