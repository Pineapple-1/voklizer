import React from "react";

function CloseBadge({ ...props }) {
  return (
    <svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.495 0C4.247 0 0 4.251 0 9.5S4.247 19 9.495 19C14.744 19 19 14.749 19 9.5S14.744 0 9.495 0zm4.024 15.2L9.5 12.778 5.481 15.2l1.064-4.57-3.543-3.073 4.674-.399L9.5 2.85l1.824 4.308 4.674.4-3.543 3.072 1.063 4.57z"
        fill="#000"
      />
    </svg>
  );
}

export default CloseBadge;
