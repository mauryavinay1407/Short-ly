import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default AuthLayout;
