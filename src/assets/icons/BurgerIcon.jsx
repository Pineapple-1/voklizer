import React from "react";

function BurgerIcon({ ...props }) {
  return (
    <svg
      width={28}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)" fill="#161A1D">
        <path d="M25.2 8.997H2.8c-1.538 0-2.8 1.351-2.8 3 0 1.65 1.262 3.001 2.8 3.001h22.403c1.54 0 2.801-1.351 2.801-3 0-1.65-1.261-3.001-2.8-3.001h-.005zM2.8 6.001h16.802c1.54 0 2.8-1.351 2.8-3 0-1.65-1.26-3.001-2.8-3.001H2.8C1.26 0 0 1.351 0 3c0 1.65 1.262 3.001 2.8 3.001zm16.802 11.998H2.8c-1.54 0-2.801 1.351-2.801 3C0 22.65 1.262 24 2.8 24h16.802c1.54 0 2.8-1.352 2.8-3 0-1.65-1.26-3.001-2.8-3.001z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h28v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default BurgerIcon;
