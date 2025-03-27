import { useCart } from "../context/CartContext";

export const CartButtons = ({ item, fromCart }) => {
  const { addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className={`${fromCart ? "scale-90" : ""}`}>
      {!item.inCart ? (
        <button
          type="button"
          className="btn btn-primary text-sm"
          onClick={() => addToCart(item)}
        >
          Add to cart
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            className="btn btn-secondary w-8 h-8 p-0 flex items-center justify-center text-lg"
            onClick={() => {
              if (item.quantity === 1) {
                removeFromCart(item);
              } else {
                updateQuantity(item, -1);
              }
            }}
          >
            -
          </button>

          <span className="min-w-[2rem] text-center text-sm font-medium text-gray-700">
            {item.quantity}
          </span>

          <button
            className="btn btn-secondary w-8 h-8 p-0 flex items-center justify-center text-lg"
            onClick={() => updateQuantity(item, 1)}
          >
            +
          </button>

          <button
            className="btn btn-secondary text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => removeFromCart(item)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
