
function Delivered({ ...props }) {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.002 8.995c0 .55.45 1 1 1s1-.45 1-1v-5.59l1.29 1.3a.996.996 0 101.41-1.41L4.712.285c-.1-.09-.21-.16-.33-.21a1 1 0 00-.76 0c-.12.05-.23.12-.33.21l-3 3c-.39.39-.39 1.03 0 1.42.39.39 1.03.39 1.42 0l1.29-1.3v5.59zm13-5h-5c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1 .45 1 1v9.72l-1.57-1.45c-.18-.17-.43-.27-.68-.27h-8.75c-.55 0-1-.45-1-1v-1c0-.55-.45-1-1-1s-1 .45-1 1v1c0 1.66 1.34 3 3 3h8.36l3 2.73a1.005 1.005 0 001.08.19c.37-.16.6-.52.6-.92v-12c0-1.66-1.34-3-3-3h-.04z"
        fill="#8532D8"
      />
    </svg>
  );
}

export default Delivered;
