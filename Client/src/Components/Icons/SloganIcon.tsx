import React from "react";

export default function SloganIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={48}
      height={48}
      fill="none"
      stroke="white" // couleur du trait
      strokeWidth={2}
      viewBox="0 0 24 24"
      className=" p-2 bg-blue-700 rounded-full mr-2"
      {...props}
    >
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
    </svg>
  );
}
