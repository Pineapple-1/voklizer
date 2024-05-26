import React from 'react'

function PersonIcon({ ...props }) {
  return (
    <svg
    width={21}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.5 11.278a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM21 23.09v-5.25c0-.787-.394-1.574-1.05-2.1-1.444-1.18-3.281-1.968-5.119-2.493a14.985 14.985 0 00-4.331-.656c-1.444 0-2.888.262-4.331.656a16.886 16.886 0 00-5.119 2.494C.394 16.266 0 17.053 0 17.84v5.25h21z"
      fill="#000"
    />
  </svg>
  )
}

export default PersonIcon