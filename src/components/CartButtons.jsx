export const CartButtons = () => {
  return (
    <div className="w-max absolute right-5 top-5">
      <div className="space-x-3">
        <button
          type="button"
          className="bg-zinc-400 border rounded-md px-2 py-1 text-sm text-white hover:bg-zinc-500 transition-colors"
        >
          + Add to cart
        </button>
      </div>
    </div>
  );
};
