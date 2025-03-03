import { allProducts } from "./assets/data/index";
import { CartItem } from "./components/CartItem";

export default function App() {
  return (
    <div className="grid place-items-center py-20">
      <h1 className="text-5xl italic text-gray-500 mb-16">
        Trend Alert: Must-Have Outfits of the Season
      </h1>
      <div className="grid grid-cols-3 place-items-start gap-10">
        {allProducts?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
