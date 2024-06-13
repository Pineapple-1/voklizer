import React from "react";

const CircleProgressBar = ({ percentage }) => {
  // Calculate the angle to fill based on the percentage
  const angle = percentage * 3.6; // 360 degrees / 100%

  return (
    <svg width="100" height="100">
      {/* Circle border */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="black"
        strokeWidth="5"
      />
      {/* Filled portion */}
      <path
        d={`M50,10 A40,40 0 ${angle > 180 ? 1 : 0},1 ${
          50 + 40 * Math.sin((angle * Math.PI) / 180)
        },${50 - 40 * Math.cos((angle * Math.PI) / 180)}
      L50,50 Z`}
        fill="blue"
        stroke="none"
      />
    </svg>
  );
};

export default CircleProgressBar;
