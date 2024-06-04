import React from "react";

function Book({ ...props }) {
  return (
    <svg
      width={33}
      height={41}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          d="M26.813 0H2.063A2.062 2.062 0 000 2.05v32.8c0 1.127.928 2.05 2.063 2.05h2.062v2.05a2.062 2.062 0 004.125 0V36.9h18.563c3.423 0 6.187-2.747 6.187-6.15V6.15C33 2.747 30.236 0 26.812 0zm-6.188 32.8h-16.5V4.1h16.5v28.7zm8.25-2.05c0 1.128-.928 2.05-2.063 2.05H24.75V4.1h2.063c1.134 0 2.062.923 2.062 2.05v24.6z"
          fill="#8532D8"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h33v41H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default Book;
