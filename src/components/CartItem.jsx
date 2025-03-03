export const CartItem = ({ item }) => {
  const { id, name, imageUrl, price } = item;

  return (
    <div className="group flex flex-col items-center gap-y-2 border border-zinc-200 rounded-md bg-white p-4">
      <img
        src={imageUrl}
        alt="Product Image"
        width={300}
        height={300}
        className="group-hover:-translate-y-2 transition-all duration-500"
      />
      <div className="text-center">
        <h1 className="text-zinc-700 text-sm">{name}</h1>
        <span className="text-pink-400 text-sm">${price}</span>
      </div>
    </div>
  );
};
