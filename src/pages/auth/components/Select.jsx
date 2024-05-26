import { useState } from "react";

function Select({ label, data }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-3 grow">
        <div className="flex flex-col gap-2">
          {selected && (
            <div className="flex gap-1">
              <div className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer">
                {selected.name}
              </div>
            </div>
          )}
          <div className="border-0 focus:ring-0 outline-none border-b-2 border-black bg-transparent text-p1" />
        </div>
        <div className="text-p1 text-start ">{label}</div>

        <div className="flex gap-2 mt-2 w-max">
          {data.map((item) => (
            <div className="flex gap-1" onClick={() => setSelected(item)}>
              <div className="bg-purple px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Select;
