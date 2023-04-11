export const CardProduct = () => {
  return (
    <div className="flex flex-col sm:flex-row m-2 items-center bg-white ">
      <img
        className="w-full h-full md:w-3/6 max-w-sm  object-cover"
        src="https://via.placeholder.com/400/300"
      />

      <div className="flex flex-col w-full self-start p-8 bg-slate-300 max-w-sm ">
        <span className="text-2xl pb-2 self-center">Name #1</span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat amet
        corrupti quod quam provident, placeat nihil nostrum assumenda
        praesentium sunt adipisci fuga quasi quis eveniet quidem officiis modi
        quae dignissimos debitis ab voluptates illum similique. Impedit, quod
        error perspiciatis alias rerum inventore qui consequuntur hic
        recusandae, aliquam sit voluptatem corporis.
        <div className="flex justify-around mt-auto p-2">
          <div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-2xl font-semibold text-gray-700 mr-2">
              ${22}
            </span>
          </div>
          <button className="text-2xl w-full">Add</button>
        </div>
      </div>
    </div>
  );
};

// export const CardProduct = () => {
//   return (
//     <div className="flex flex-col w-full sm:w-4/6 flex-col m-1 bg-stone-100 shadow-lg items-center">
//       <img
//         className="w-full  object-cover"
//         src="https://via.placeholder.com/400/300"
//       />
//       <span className="text-2xl pb-2">Name #1</span>
//       <div className="flex self-start p-2">
//   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat amet corrupti quod quam provident, placeat nihil nostrum assumenda praesentium sunt adipisci fuga quasi quis eveniet quidem officiis modi quae dignissimos debitis ab voluptates illum similique. Impedit, quod error perspiciatis alias rerum inventore qui consequuntur hic recusandae, aliquam sit voluptatem corporis.
//       </div>

//       <div className="flex justify-around mt-auto p-2">
//         <div>
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-2xl font-semibold text-gray-700 mr-2">
//             ${22}
//           </span>
//         </div>
//         <button className="text-2xl w-full">Add</button>
//       </div>
//     </div>
//   );
// };
