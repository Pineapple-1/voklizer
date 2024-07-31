import React from "react";

function PaymentsCards({ props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 70 12"
      {...props}
    >
      <path
        fill="#FFB600"
        d="M51.579 5.664a5.66 5.66 0 01-5.665 5.665c-3.117 0-5.664-2.548-5.664-5.665C40.25 2.548 42.767 0 45.885 0a5.666 5.666 0 015.694 5.664z"
      />
      <path
        fill="#F7981D"
        d="M45.914 0c3.117 0 5.665 2.548 5.665 5.664a5.66 5.66 0 01-5.665 5.665c-3.117 0-5.664-2.548-5.664-5.665"
      />
      <path
        fill="#FF8500"
        d="M45.914 0c3.117 0 5.665 2.548 5.665 5.664a5.66 5.66 0 01-5.665 5.665"
      />
      <path
        fill="#FF5050"
        d="M38.302 0a5.667 5.667 0 00-5.605 5.664 5.66 5.66 0 005.665 5.665c1.468 0 2.787-.57 3.806-1.469.21-.18.39-.39.57-.599h-1.17c-.15-.18-.299-.39-.419-.57h2.008c.12-.18.24-.39.33-.599h-2.668a3.57 3.57 0 01-.24-.6h3.118c.18-.569.3-1.168.3-1.798 0-.42-.06-.809-.12-1.198H40.4c.03-.21.09-.39.15-.6h3.117c-.06-.21-.15-.42-.24-.6h-2.638c.09-.209.21-.389.33-.599h2.008c-.12-.21-.27-.42-.45-.6H41.57c.18-.209.36-.389.57-.568-.99-.93-2.339-1.47-3.807-1.47 0-.059 0-.059-.03-.059z"
      />
      <path
        fill="#E52836"
        d="M32.697 5.664a5.66 5.66 0 005.665 5.665c1.468 0 2.787-.57 3.806-1.469.21-.18.39-.39.57-.599h-1.17c-.15-.18-.299-.39-.419-.57h2.008c.12-.18.24-.39.33-.599h-2.668a3.57 3.57 0 01-.24-.6h3.118c.18-.569.3-1.168.3-1.798 0-.42-.06-.809-.12-1.198H40.4c.03-.21.09-.39.15-.6h3.117c-.06-.21-.15-.42-.24-.6h-2.638c.09-.209.21-.389.33-.599h2.008c-.12-.21-.27-.42-.45-.6H41.57c.18-.209.36-.389.57-.569C41.148.6 39.8.06 38.331.06h-.03"
      />
      <path
        fill="#CB2026"
        d="M38.362 11.329c1.468 0 2.787-.57 3.806-1.469.21-.18.39-.39.57-.599h-1.17c-.15-.18-.299-.39-.419-.57h2.008c.12-.18.24-.39.33-.599h-2.668a3.57 3.57 0 01-.24-.6h3.118c.18-.569.3-1.168.3-1.798 0-.42-.06-.809-.12-1.198H40.4c.03-.21.09-.39.15-.6h3.117a3.57 3.57 0 00-.24-.6h-2.638c.09-.209.21-.389.33-.599h2.008c-.12-.21-.27-.42-.45-.6H41.57c.18-.209.36-.389.57-.569C41.148.6 39.8.06 38.331.06h-.03"
      />
      <path
        fill="#fff"
        d="M40.37 7.103l.09-.51c-.03 0-.09.03-.15.03-.21 0-.24-.12-.21-.18l.18-1.048h.33l.09-.57h-.3l.06-.36h-.6s-.36 1.979-.36 2.218c0 .36.21.51.48.51.18 0 .33-.06.39-.09zm.21-.959c0 .84.57 1.049 1.049 1.049.45 0 .63-.09.63-.09l.119-.57s-.33.15-.63.15c-.659 0-.539-.479-.539-.479h1.229s.09-.39.09-.54c0-.39-.21-.869-.87-.869-.629-.06-1.078.6-1.078 1.349zm1.049-.87c.33 0 .27.39.27.42h-.66c0-.03.06-.42.39-.42zm3.806 1.829l.12-.66s-.3.15-.51.15c-.42 0-.6-.33-.6-.689 0-.72.36-1.109.78-1.109.3 0 .54.18.54.18l.09-.63s-.36-.15-.69-.15c-.69 0-1.379.6-1.379 1.74 0 .748.36 1.258 1.08 1.258.24 0 .569-.09.569-.09zm-8.362-2.368c-.42 0-.72.12-.72.12l-.09.51s.27-.12.66-.12c.21 0 .39.03.39.21 0 .12-.03.15-.03.15h-.27c-.51 0-1.079.21-1.079.899 0 .54.36.659.57.659.42 0 .6-.27.629-.27l-.03.24h.54l.24-1.648c0-.72-.6-.75-.81-.75zm.12 1.35c0 .089-.06.569-.42.569-.18 0-.24-.15-.24-.24 0-.15.09-.36.54-.36.09.03.12.03.12.03zm1.259 1.078c.15 0 .899.03.899-.78 0-.748-.72-.599-.72-.898 0-.15.12-.21.33-.21.09 0 .42.03.42.03l.09-.54s-.21-.06-.57-.06c-.45 0-.899.18-.899.78 0 .689.75.629.75.899 0 .18-.21.21-.36.21-.27 0-.54-.09-.54-.09l-.09.54c.03.06.18.119.69.119zM50.41 4.256l-.12.809s-.24-.3-.57-.3c-.539 0-1.018.66-1.018 1.439 0 .48.24.989.75.989a.8.8 0 00.569-.24l-.03.21h.599l.45-2.877-.63-.03zm-.27 1.588c0 .33-.15.75-.48.75-.209 0-.329-.18-.329-.48 0-.48.21-.78.48-.78.21 0 .33.15.33.51zM33.806 7.133l.36-2.158.06 2.158h.42l.779-2.158-.33 2.158h.63l.479-2.877h-.989l-.6 1.768-.03-1.768h-.868l-.48 2.877h.57zm9.291 0c.18-.989.21-1.798.63-1.648.06-.39.15-.54.21-.69h-.12c-.27 0-.48.36-.48.36l.06-.33h-.57l-.39 2.338h.66v-.03zm3.717-2.398c-.42 0-.72.12-.72.12l-.09.51s.27-.12.66-.12c.21 0 .39.03.39.21 0 .12-.03.15-.03.15h-.27c-.51 0-1.08.21-1.08.899 0 .54.36.659.57.659.42 0 .6-.27.63-.27l-.03.24h.54l.239-1.648c.03-.72-.6-.75-.81-.75zm.15 1.35c0 .089-.06.569-.42.569-.18 0-.24-.15-.24-.24 0-.15.09-.36.54-.36.09.03.09.03.12.03zm1.168 1.048c.18-.989.21-1.798.63-1.648.06-.39.15-.54.21-.69h-.12c-.27 0-.48.36-.48.36l.06-.33h-.57l-.39 2.338h.66v-.03z"
      />
      <path
        fill="#DCE5E5"
        d="M39.44 6.683c0 .36.21.51.48.51.21 0 .39-.06.45-.09l.09-.51c-.03 0-.09.03-.15.03-.21 0-.24-.12-.21-.18l.18-1.048h.33l.09-.57h-.3l.06-.36m.42 1.679c0 .84.27 1.049.749 1.049.45 0 .63-.09.63-.09l.119-.57s-.33.15-.63.15c-.659 0-.539-.479-.539-.479h1.229s.09-.39.09-.54c0-.39-.21-.869-.87-.869-.629-.06-.779.6-.779 1.349zm.749-.87c.33 0 .39.39.39.42h-.78c0-.03.06-.42.39-.42zm3.806 1.829l.12-.66s-.3.15-.51.15c-.42 0-.6-.33-.6-.689 0-.72.36-1.109.78-1.109.3 0 .54.18.54.18l.09-.63s-.36-.15-.69-.15c-.69 0-1.079.6-1.079 1.74 0 .748.06 1.258.78 1.258.24 0 .569-.09.569-.09zm-9.171-1.708s.27-.12.66-.12c.209 0 .389.03.389.21 0 .12-.03.15-.03.15h-.27c-.51 0-1.079.21-1.079.899 0 .54.36.659.57.659.42 0 .6-.27.629-.27l-.03.24h.54l.24-1.648c0-.69-.6-.72-.84-.72m.45 1.29c0 .089-.36.569-.72.569-.18 0-.24-.15-.24-.24 0-.15.09-.36.54-.36.09.03.42.03.42.03zm.299 1.018s.18.06.69.06c.15 0 .899.03.899-.78 0-.748-.72-.599-.72-.898 0-.15.12-.21.33-.21.09 0 .42.03.42.03l.09-.54s-.21-.06-.57-.06c-.45 0-.6.18-.6.78 0 .689.45.629.45.899 0 .18-.21.21-.36.21M50.29 5.065s-.24-.3-.57-.3c-.539 0-.718.66-.718 1.439 0 .48-.06.989.45.989a.8.8 0 00.569-.24l-.03.21h.599l.45-2.877m-.78 1.558c0 .33-.27.75-.6.75-.209 0-.329-.18-.329-.48 0-.48.21-.78.48-.78.21 0 .45.15.45.51zM33.806 7.133l.36-2.158.06 2.158h.42l.779-2.158-.33 2.158h.63l.479-2.877h-.75l-.838 1.768-.03-1.768h-.33l-1.02 2.877h.57zm8.662 0h.63c.18-.989.21-1.798.629-1.648.06-.39.15-.54.21-.69h-.12c-.27 0-.48.36-.48.36l.06-.33m2.608.57s.27-.12.659-.12c.21 0 .39.03.39.21 0 .12-.03.15-.03.15h-.27c-.51 0-1.08.21-1.08.899 0 .54.36.659.57.659.42 0 .6-.27.63-.27l-.03.24h.54l.239-1.648c0-.69-.6-.72-.84-.72m.45 1.29c0 .089-.36.569-.719.569-.18 0-.24-.15-.24-.24 0-.15.09-.36.54-.36.12.03.42.03.42.03zm.27 1.048h.63c.18-.989.21-1.798.629-1.648.06-.39.15-.54.21-.69h-.12c-.27 0-.48.36-.48.36l.06-.33"
      />
      <path
        fill="#3498D8"
        fillRule="evenodd"
        d="M69.079.921H56.184a.924.924 0 00-.92.921v7.829c0 .507.414.921.92.921H69.08a.924.924 0 00.92-.921V1.842a.924.924 0 00-.921-.92z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M58.349 5.895h.737l-.369-.921-.368.92zm10.27-1.75H66.73l-.46.506-.415-.506H61.85l-.369.829-.368-.83H59.5v.37l-.184-.37h-1.382L56.6 7.369h1.612l.184-.506h.46l.184.506h1.797V7l.138.368h.92l.139-.414v.414h3.684l.46-.506.415.506h1.888l-1.197-1.611 1.335-1.612zm-5.573 2.763h-.507V5.112l-.782 1.796h-.46l-.784-1.796v1.796h-1.059L59.27 6.4h-1.106l-.184.507h-.598l.967-2.303h.783l.875 2.165V4.605h.875l.69 1.566.645-1.566h.875v2.303h-.046zm4.56 0h-.691l-.6-.783-.69.783h-2.072V4.605h2.118l.645.737.69-.737h.645l-1.013 1.152.967 1.15zm-3.547-1.842v.414h1.152v.46h-1.152v.461h1.29l.598-.69-.552-.645h-1.336z"
        clipRule="evenodd"
      />
      <path
        fill="#3C58BF"
        d="M10.638 10.408l1.474-8.29h2.303l-1.428 8.29h-2.349z"
      />
      <path
        fill="#293688"
        d="M10.638 10.408l1.888-8.29h1.889l-1.428 8.29h-2.349z"
      />
      <path
        fill="#3C58BF"
        d="M21.322 2.21c-.46-.184-1.197-.368-2.118-.368-2.303 0-3.96 1.151-3.96 2.81 0 1.243 1.15 1.887 2.072 2.302.92.414 1.197.69 1.197 1.06 0 .552-.737.828-1.381.828-.921 0-1.428-.138-2.21-.46l-.323-.139-.323 1.889c.553.23 1.566.46 2.625.46 2.441 0 4.053-1.151 4.053-2.901 0-.967-.599-1.704-1.98-2.303-.83-.414-1.336-.645-1.336-1.06 0-.367.415-.736 1.336-.736.783 0 1.335.138 1.75.322l.23.093.368-1.796z"
      />
      <path
        fill="#293688"
        d="M21.322 2.21c-.46-.184-1.197-.368-2.118-.368-2.303 0-3.546 1.151-3.546 2.81 0 1.243.737 1.887 1.658 2.302.92.414 1.197.69 1.197 1.06 0 .552-.737.828-1.381.828-.921 0-1.428-.138-2.21-.46l-.323-.139-.323 1.889c.553.23 1.566.46 2.625.46 2.441 0 4.053-1.151 4.053-2.901 0-.967-.599-1.704-1.98-2.303-.83-.414-1.336-.645-1.336-1.06 0-.367.415-.736 1.336-.736.783 0 1.335.138 1.75.322l.23.093.368-1.796z"
      />
      <path
        fill="#3C58BF"
        d="M25.283 2.118c-.553 0-.967.046-1.198.6l-3.453 7.69h2.486l.461-1.382h2.947l.277 1.382h2.21l-1.934-8.29h-1.796zm-1.06 5.527c.139-.415.922-2.441.922-2.441s.184-.507.322-.829l.138.783s.46 2.072.553 2.533h-1.934v-.046z"
      />
      <path
        fill="#293688"
        d="M25.835 2.118c-.552 0-.967.046-1.197.6l-4.006 7.69h2.486l.461-1.382h2.947l.277 1.382h2.21l-1.934-8.29h-1.244zm-1.611 5.527c.184-.46.92-2.441.92-2.441s.185-.507.323-.829l.138.783s.46 2.072.553 2.533h-1.934v-.046z"
      />
      <path
        fill="#3C58BF"
        d="M6.401 7.921l-.23-1.197c-.414-1.382-1.75-2.902-3.224-3.638l2.073 7.368h2.487l3.73-8.29H8.75L6.401 7.921z"
      />
      <path
        fill="#293688"
        d="M6.401 7.921l-.23-1.197c-.414-1.382-1.75-2.902-3.224-3.638l2.073 7.368h2.487l3.73-8.29H9.21L6.4 7.921z"
      />
      <path
        fill="#FFBC00"
        d="M0 2.118l.414.093c2.948.69 4.974 2.44 5.757 4.513l-.829-3.915c-.138-.552-.553-.69-1.06-.69H0z"
      />
      <path
        fill="#F7981D"
        d="M0 2.118c2.947.691 5.388 2.487 6.171 4.56l-.783-3.27a1.124 1.124 0 00-1.105-.875L0 2.118z"
      />
      <path
        fill="#ED7C00"
        d="M0 2.118c2.947.691 5.388 2.487 6.171 4.56l-.553-1.796c-.138-.553-.322-1.106-.967-1.336L0 2.118z"
      />
      <path
        fill="#051244"
        d="M8.704 7.645L7.138 6.079l-.737 1.75-.184-1.151c-.414-1.382-1.75-2.902-3.224-3.639l2.073 7.369h2.487l1.15-2.763zm4.283 2.763l-1.98-2.026-.369 2.026h2.349zm5.296-2.855c.184.184.276.322.23.506 0 .553-.737.83-1.381.83-.921 0-1.428-.139-2.21-.461l-.323-.139-.323 1.889c.553.23 1.566.46 2.625.46 1.474 0 2.671-.414 3.362-1.151l-1.98-1.934zm2.671 2.855h2.165l.46-1.382h2.947l.277 1.382h2.21l-.783-3.362-2.763-2.671.138.737s.46 2.072.553 2.533h-1.934c.184-.46.92-2.441.92-2.441s.185-.507.323-.829"
      />
    </svg>
  );
}

export default PaymentsCards;