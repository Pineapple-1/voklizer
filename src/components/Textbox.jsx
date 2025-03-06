import React, { forwardRef } from "react";
import clsx from "clsx";

const Textbox = forwardRef(
  ({ label, subtitle, placeholder = "", variant, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-3 grow">
        <input
          className={clsx(
            "border-0 focus:ring-0 outline-none border-b-2 bg-transparent text-p1 placeholder:text-xs",
            !variant && "border-purple",
            variant === "dark" && "border-black placeholder:text-black pb-2"
          )}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />
        <div className="flex justify-between mt-2.5">
          <div className="text-p1 text-start">{label}</div>
          <div className="text-[14px] leading-[13px] text-[#B8B8B8]">
            {subtitle}
          </div>
        </div>
      </div>
    );
  }
);

export default Textbox;
