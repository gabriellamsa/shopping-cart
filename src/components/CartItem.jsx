import { CartButtons } from "./CartButtons";

export const CartItem = ({ item, fromCart }) => {
  const { id, name, imageUrl, price } = item;

  return (
    <div
      key={id}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            !fromCart && "group-hover:scale-105"
          }`}
        />
        {!fromCart && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        )}
      </div>

      <div className="p-4 space-y-2">
        <h2
          className={`font-medium text-gray-900 ${
            fromCart ? "text-sm" : "text-base"
          }`}
        >
          {name}
        </h2>
        <div className="flex items-center justify-between">
          <span
            className={`font-semibold text-primary-600 ${
              fromCart ? "text-sm" : "text-lg"
            }`}
          >
            ${price.toFixed(2)}
          </span>
          <CartButtons item={item} fromCart={fromCart} />
        </div>
      </div>
    </div>
  );
};
