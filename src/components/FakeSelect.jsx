import { useState } from "react";

function FakeSelect({ label }) {
  const [selected, setSelected] = useState(null);
  const data = [
    {
      name: "Immigration",
      price: "£2000",
    },
    {
      name: "Property",
      price: "£3000",
    },
    {
      name: "Personal Injury",
      price: "£500",
    },
    {
      name: "Criminal Law",
      price: "£2000",
    },
    {
      name: "Family Law",
      price: "£5000",
    },
    {
      name: "Property Law",
      price: "£2000",
    },

  ];
  return (
    <>
      <div className="flex flex-col gap-3 grow">
        <div className="flex flex-col gap-2">
          {selected && (
            <div className="flex gap-1">
              <div className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer">
                {selected.name}
              </div>
              <div className="bg-[#C9C9C9] px-3 py-0.5 text-p1 text-black w-max rounded-[14px] cursor-pointer">
                {selected.price}
              </div>
            </div>
          )}
          <div className="border-0 focus:ring-0 outline-none border-b-2 border-purple bg-transparent text-p1" />
        </div>
        <div className="text-p1 text-start ">{label}</div>

        <div className="flex flex-col gap-1 mt-2 w-max">
          {data.map((item) => (
            <div className="flex gap-1" onClick={() => setSelected(item)}>
              <div className="bg-black px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer">
                {item.name}
              </div>
              <div className="bg-[#C9C9C9] px-3 py-0.5 text-p1 text-black w-max rounded-[14px] cursor-pointer">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FakeSelect;
