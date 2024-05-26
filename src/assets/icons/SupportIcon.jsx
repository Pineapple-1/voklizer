import React from "react";

function SupportIcon({ ...props }) {
  return (
    <svg
      width={20}
      height={23}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.087 20.372v1.652c1.935 0 3.471-.704 4.645-1.652h-4.645z"
        fill="#000"
      />
      <path
        d="M1.826 12.111v1.652c0 2.066 1.652 2.479 1.652 2.479s1.652 4.956 6.609 4.956"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M19.174 12.937h-2.478c0-5.154-2.479-7.434-2.479-7.434-2.478 5.782-10.739 1.652-10.739 7.434H1V9.633C1 3.85 5.957.546 10.087.546c3.304 0 4.13 1.652 4.13 1.652 3.305 0 4.957 4.13 4.957 7.435v3.304zM10.5 16.242h-.826a1.24 1.24 0 000 2.478h.826a1.24 1.24 0 000-2.478z"
        fill="#000"
      />
      <path
        d="M10.913 17.894h4.13a3.304 3.304 0 003.305-3.304v-2.48"
        stroke="#000"
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <path
        d="M18.348 15.416h-1.652v-4.13h1.652c.913 0 1.652.739 1.652 1.651v.827c0 .912-.74 1.652-1.652 1.652z"
        fill="#000"
      />
    </svg>
  );
}

export default SupportIcon;
