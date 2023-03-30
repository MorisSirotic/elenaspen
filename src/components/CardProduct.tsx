export const CardProduct = () => {
  return (
    <div className="flex  flex-col m-1 bg-stone-100    shadow-lg">
      <img
        className="w-[140px] sm:w-[10rem] p-0"
        src="https://via.placeholder.com/400/300"
      />
      <span>Name #1</span>

      <span className="w-[120px]">
       
      </span>

      <div className="flex justify-around">
        <button className="text-red-300 m-2">Details</button>
        <button className=" w-full p-2">Add</button>
      </div>
    </div>
  );
};
