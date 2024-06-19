import React from "react";

function SingleTick({ ...props }) {
  return (
    <svg
      width={28}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.378 20.758c-.868 0-1.728-.345-2.423-1.04l-6.917-6.917c-1.384-1.384-1.384-3.455 0-4.846 1.383-1.384 3.634-1.384 4.845 0l4.495 4.494L21.79 1.038c1.383-1.384 3.454-1.384 4.838 0 1.383 1.383 1.383 3.454 0 4.838L12.793 19.711c-.688.695-1.555 1.039-2.423 1.039l.008.008z"
        fill="#8532D8"
      />
    </svg>
  );
}

export default SingleTick;
