import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { UserButton} from '@clerk/nextjs';

const Dashboard: React.FC = () => {
  const userId = auth();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full flex bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          My Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Welcome to your dashboard, {userId ? `User ${userId}` : 'Guest'}!
        </p>
        </div>
        <div className="flex justify-end items-start">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
