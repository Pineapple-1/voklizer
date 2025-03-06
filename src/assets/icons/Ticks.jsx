
function Ticks({ ...props }) {
  return (
    <svg
      width={14}
      height={7}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.074 5.785l.964-.891.35.324L13.035 0 14 .89 7.395 7 6.08 5.785h-.007zm-2.88-.567L8.842 0l.964.89L3.194 7 0 4.04l.965-.89 2.23 2.068z"
        fill="#8532D8"
      />
    </svg>
  );
}

export default Ticks;
