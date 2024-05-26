import React from "react";

function SpeakerIcon({ ...props }) {
  return (
    <svg
      width={21}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.54 7.453h.847v6.774H2.54a1.693 1.693 0 01-1.693-1.694V9.147A1.693 1.693 0 012.54 7.453zm9.99 12.362l-7.45-5.588V7.453l7.45-5.588a1.694 1.694 0 012.71 1.355v15.24a1.694 1.694 0 01-2.71 1.355zM16.934 8.3a2.54 2.54 0 110 5.08V8.3z"
        fill="#000"
      />
    </svg>
  );
}

export default SpeakerIcon;
