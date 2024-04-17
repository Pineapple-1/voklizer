import React from "react";
import clsx from "clsx";

function ChipButton({ children, className, ...props }) {
  return (
    <div
      {...props}
      className={clsx(
        "bg-purple px-3 py-0.5 text-p1 text-white w-max rounded-[14px] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ChipButton;