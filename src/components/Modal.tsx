import React from "react";

export const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </div>
  </div>
);