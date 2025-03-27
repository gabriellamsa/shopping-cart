import { ShoppingCartIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/FormatCurrency";
import { CheckoutButton } from "./CheckoutButtons";

export const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { allItems, setLocalStorage } = useCart();

  useEffect(() => {
    const inCartItems = allItems.filter((item) => item.inCart);
    setCartItems(inCartItems?.reverse());

    const price = inCartItems.reduce((accumulator, item) => {
      return (accumulator += item.price * item.quantity);
    }, 0);
    setTotalPrice(price);
  }, [allItems]);

  setLocalStorage();

  return (
    <>
      {cartItems.length !== 0 && (
        <>
          {/* Cart button */}
          <button
            className="fixed right-4 top-4 z-40 bg-white p-3 rounded-full shadow-soft hover:shadow-lg transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
              {cartItems.length > 9 ? "9+" : cartItems.length}
            </span>
          </button>

          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Cart panel */}
          <div
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Shopping Cart
                </h2>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <XIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems?.map((item) => (
                  <CartItem key={item.id} item={item} fromCart={true} />
                ))}
              </div>

              {/* Footer with total and checkout */}
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total</span>
                  <span className="text-xl font-semibold text-gray-900">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <CheckoutButton cartItems={cartItems} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
