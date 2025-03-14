import { useEffect } from "react";
import { CartItem } from "./components/CartItem";
import { useCart } from "./context/CartContext";
import { ShoppingCart } from "./components/ShoppingCart";

export default function App() {
  const { allItems, setItems } = useCart();
  useEffect(() => {
    setItems();
  }, []);

  useEffect(() => {
    console.log(allItems);
  }, [allItems]);

  return (
    <div className="grid place-items-center py-20">
      <h1 className="text-5xl italic text-gray-500 mb-16">
        Trend Alert: Must-Have Outfits of the Season
      </h1>
      <ShoppingCart />
      <div className="grid grid-cols-3 place-items-start gap-10">
        {allItems?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
