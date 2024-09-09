import React from "react";

function Goback({ ...props }) {
  return (
    <svg
      width="27"
      height="27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 0C6.044 0 0 6.044 0 13.5S6.044 27 13.5 27 27 20.956 27 13.5 20.956 0 13.5 0Zm7.364 14.728H9.099l2.814 2.814a1.226 1.226 0 1 1-1.705 1.765l-.03-.03-4.91-4.91a1.228 1.228 0 0 1 0-1.735l4.91-4.91a1.227 1.227 0 1 1 1.766 1.705l-.03.031-2.815 2.814h11.765a1.228 1.228 0 0 1 0 2.456Z"
        fill="#232323"
      />
    </svg>
  );
}

export default Goback;
