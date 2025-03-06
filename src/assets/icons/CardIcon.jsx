
function CardIcon({ ...props }) {
  return (
    <svg
      width={20}
      height={15}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.333 0H1.667C.747 0 0 .747 0 1.667v11.666C0 14.253.747 15 1.667 15h16.666c.92 0 1.667-.747 1.667-1.667V1.667C20 .747 19.253 0 18.333 0zM6.667 11.667H3.333V10h3.334v1.667zm6.666 0h-5V10h5v1.667z"
        fill="#1D1D1B"
      />
    </svg>
  );
}

export default CardIcon;
