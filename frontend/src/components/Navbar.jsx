import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
              />
            </svg>
            <h1 className="text-xl font-bold">Chat Bot</h1>
          </div>
          
          <div className="flex items-center">
            <span className="hidden md:block mr-4 text-sm">Welcome, Harsh</span>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-lg font-bold text-purple-700">HG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;