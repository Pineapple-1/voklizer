
function Star({ ...props }) {
  return (
    <svg
      width={11}
      height={11}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 4.126H6.792L5.503 0 4.208 4.126H0l3.415 2.558L2.063 11l3.44-2.748L8.937 11 7.591 6.684 11 4.126z"
        fill="#fff"
      />
    </svg>
  );
}

export default Star;
