"use client";
import React, { useState } from "react";
// import "./YourComponent.css"; // Import your styles here

const YourComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>
          {/* Sidebar Content */}
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            {isOpen && (
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-semibold text-black">Search</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* Search Input */}
                  <div className="mt-4 px-4">
                    <input
                      type="text"
                      placeholder="Search post here"
                      className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                    />
                  </div>
                  <div className="mt-4 px-4">
                    <p className="ml-2 text-gray-400">Results</p>
                  </div>
                  {/* Sidebar Content */}
                  <div className="mt-4 px-4 h-full overflow-auto">
                    {/* Add your cards here */}
                  </div>
                  {/* Sidebar Footer */}
                  <div className="mt-6 px-4">
                    <button className="flex justify-center items-center bg-black text-white rounded-md text-sm p-2 gap-1">
                      <svg
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Your SVG path here */}
                      </svg>
                      Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
      {/* Your main content goes here */}
      {/* Open sidebar button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Open Sidebar
      </button>
    </div>
  );
};

export default YourComponent;
