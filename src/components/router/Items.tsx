export const Items = () => {
  return <div>Items Page</div>;
};

export const ProductItem = (props: {
  id: string;
  name: string;
  description: string;
  price: number;
}) => {
  const { id, name, description, price } = props;
  return (
    <div className="flex flex-col items-center max-w-sm rounded overflow-hidden shadow-md bg-white m-4">
      <img
        className="w-48 h-48 object-cover"
        src={`https://via.placeholder.com/400/300`}
        alt={name}
      />
      <div className="flex-grow flex flex-col justify-between px-6 py-4 items-center">
        <div>
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="flex m-auto">
          <span className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            ${price}
          </span>
        </div>
      </div>
    </div>
  );
};
