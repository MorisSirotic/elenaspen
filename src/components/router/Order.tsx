export const Order = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div>Order ID: 0340340</div>
        <div>Order date: 12.22.1998</div>
      </div>

      <OrderItem />

      <OrderItem />

      <OrderItem />

      <OrderItem />
    </div>
  );
};

export const OrderItem = () => {
  return (
    <div className="w-full flex justify-around my-2 border-b">
      <img className="w-20" src="https://via.placeholder.com/400/300" />
      <div className="flex items-center p-4">Item Name</div>

      <div className="flex items-center p-4">€200.00</div>
    </div>
  );
};
