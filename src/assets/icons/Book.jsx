import React from "react";

function Book({ ...props }) {
  return (
    <svg
      width="33"
      height="41"
      viewBox="0 0 33 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_41_3430)">
        <path
          d="M26.8125 0H2.0625C0.928125 0 0 0.9225 0 2.05V34.85C0 35.9775 0.928125 36.9 2.0625 36.9H4.125V38.95C4.125 40.0775 5.05312 41 6.1875 41C7.32188 41 8.25 40.0775 8.25 38.95V36.9H26.8125C30.2362 36.9 33 34.153 33 30.75V6.15C33 2.747 30.2362 0 26.8125 0ZM20.625 32.8H4.125V4.1H20.625V32.8ZM28.875 30.75C28.875 31.8775 27.9469 32.8 26.8125 32.8H24.75V4.1H26.8125C27.9469 4.1 28.875 5.0225 28.875 6.15V30.75Z"
          fill="#8532D8"
        />
      </g>
      <defs>
        <clipPath id="clip0_41_3430">
          <rect width="33" height="41" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Book;
