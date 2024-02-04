export function FarmsDisplay({ title, description, price, img }) {
  return (
    <>
      <div className="flex">
        <div className="border-2">
          <div className="flex flex-col  w-64 h-64">
            <img className="w-64 h-36" src={img}></img>
            <div className="pt-2 text-center font-bold text-xl">{title}</div>
            <div className="text-xs text-center">{description}</div>
            <div className="text-xl font-bold text-center pt-3">{price}</div>
          </div>
        </div>
      </div>
    </>
  );
}
