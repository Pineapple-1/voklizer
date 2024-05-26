import React from "react";

function HomeIconSm({ ...props }) {
  return (
    <svg
      width={17}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.628 5.293L9.917.446C9.095-.15 7.903-.15 7.08.446L.37 5.293a.854.854 0 00-.37.69v9.123C0 15.595.448 16 1 16h4.5c.55 0 1-.403 1-.894V9.33h4v5.775c0 .489.447.894 1 .894H16c.55 0 1-.403 1-.894V5.984a.847.847 0 00-.37-.688l-.002-.003zm-.631 9.818h-4.5V9.328c0-.489-.448-.884-1-.884H6.498c-.55 0-1 .395-1 .884v5.783H1V5.984l6.711-4.848a1.382 1.382 0 011.578 0l6.71 4.848v9.127h-.002z"
        fill="#161A1D"
      />
    </svg>
  );
}

export default HomeIconSm;
