// components/Popup.tsx
import React from 'react';

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <button
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </div>
  );
};

export default Popup;
