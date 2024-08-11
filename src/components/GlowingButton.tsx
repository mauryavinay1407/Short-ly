"use client";

export const GlowingButton = ({ children, onClick }: any) => {
  return (
    <div
      className="h-12 w-36 bg-black flex justify-center items-center ml-6 sm:h-12 sm:w-40 md:h-16 md:w-44 lg:h-20 lg:w-36"
      onClick={onClick}
    >
      <div className="absolute inline-flex group">
        <div
          className="absolute transition-all rounded-full duration-1000 opacity-70 inset-0 bg-gradient-to-r from-purple-700 via-red-600 to-orange-700 blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt dark:to-red-500"
        ></div>

        <div
          className="relative inline-flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:px-6 sm:py-3 sm:text-lg md:px-8 md:py-4 md:text-xl lg:px-10 lg:py-5 lg:text-xl"
          role="button"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
