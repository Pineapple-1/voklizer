import clsx from "clsx";

function ChipButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        "bg-purple px-8 py-3 text-p1 text-white w-max rounded-[14px] cursor-pointer disabled:bg-slate-400",
        className
      )}
    >
      {children}
    </button>
  );
}

export default ChipButton;
