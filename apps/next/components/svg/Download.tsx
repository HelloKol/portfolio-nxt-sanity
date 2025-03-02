import React from "react";

export default function Download({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" />
      <path
        d="M5 12V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V12"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 3L12 15M12 15L16 11M12 15L8 11"
        stroke="#ffffff"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
