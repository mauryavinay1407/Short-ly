import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { UserButton} from '@clerk/nextjs';
import { FaArrowLeft} from "react-icons/fa";
import Link from "next/link"


const Dashboard: React.FC = () => {

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gradient-to-r from-neutral-900 via-gray-900 to-stone-900">
      <div className="max-w-md w-full justify-between flex bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <div className='relative top-1 right-2'> 
      <Link href="/home">
      <FaArrowLeft />
      </Link>
        </div>
        <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          My Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Welcome to your dashboard
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
