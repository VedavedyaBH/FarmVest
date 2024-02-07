export function FarmsDisplay({ title, description, price, img }) {
  return (
    <>
      <div className="">
        <div className="bg-white rounded-lg border-2 flex h-96 w-72">
          <div className="inline-grid grid-cols-1 flex">
            <div className="flex p-3 text-xl text-gray-500 h-32 inline-grid grid-cols-1 flex border-y">
              <div className="flex place-content-between">
                <div className="">
                  <div className="font-bold">{title}</div>
                </div>
                <div className="">
                  <div className="font-bold">{price}</div>
                </div>
              </div>

              <div className="flex text-sm w-64 inline-grid grid-cols-2 place-content-between ">
                <div className="flex place-content-start w-30 text-xs">
                  Open : {price}
                </div>
                <div className="flex place-content-end  w-30 text-xs">
                  Close : {price}
                </div>
                <div className="flex place-content-start w-30 text-xs">
                  Upper Circuit : {price}
                </div>
                <div className="flex place-content-end  w-30 text-xs">
                  Lower Circuit : {price}
                </div>
              </div>
            </div>
            <div className="flex justify-center text-gray-500 text-base p-3 h-32 w-72 border-y">
              {description}
            </div>
            <img
              className="flex justify-center p-3 h-32 w-72  "
              src={img}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

// return (
//   <>
//     <div className="flex h-72">
//       <div className="bg-slate-100">
//         <div className="flex flex-col w-64 h-64">
//           <div className="bg-slate-100 flex justify-center p-2 shadow-sm">
//             <img className="w-60 h-36" src={img}></img>{" "}
//           </div>
//           <div className="flex justify-center pt-2 text-center font-bold text-xl w-auto h-36">
//             {title}
//           </div>
//           <div className="flex justify-center text-xs text-center">{description}</div>
//           <div className="flex justify-center text-xl font-bold text-center pt-3 border-2">{price}</div>
//         </div>
//       </div>
//     </div>
//   </>
// );
// }
