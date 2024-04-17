function Textbox({ lable, subtitle }) {
  return (
    <div className="flex flex-col gap-3 grow">
      <input className="border-0 focus:ring-0 outline-none border-b-2 border-purple bg-transparent text-p1 " />
      <div className="flex justify-between mt-[10px]">
        <div className="text-p1 text-start ">{lable}</div>
        <div className="text-[10px] leading-[13px] text-[#B8B8B8]">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default Textbox;
