import React from "react";

export const CloseIcon: React.FC = (props) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 1.5L1.5 16.5"
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 1.5L16.5 16.5"
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
