"use client";

import React from "react";

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  onClick,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="relative inline-flex group ml-2 focus:outline-none"
    >
      <span
        className="absolute transition-all rounded-full duration-1000 opacity-70 inset-0 bg-gradient-to-r from-purple-700 via-red-600 to-orange-700 blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt dark:to-red-500"
        aria-hidden="true"
      ></span>
      <span
        className={`relative inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-4 md:text-xl lg:px-10 lg:py-5 lg:text-xl ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};
