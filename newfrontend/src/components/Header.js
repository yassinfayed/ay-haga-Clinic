'use client'
import React from "react";
import { logoutAction } from "@/app/redux/actions/authActions";
import { useDispatch } from "react-redux";


const Header = ({ logoutOnly }) => {
  const dispatch = useDispatch();

  return (
    <header className="shadow-md py-4 px-4 sm:px-10 font-sans-serif min-h-70px">
      {(logoutOnly != true) ? (<div className="flex flex-wrap items-center justify-between gap-5 relative">
        {/* replace with clinic logo */}
        <a href="javascript:void(0)">
          <div className="flex">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Clinic Logo"
            />

            <span className="ms-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Vite Clinics
            </span>
          </div>
        </a>
        <div className="flex lg:order-1 max-sm:ml-auto">
          <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
            <a href="/guest/login">
              Login
            </a>
          </button>
          <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] ml-3">
            <a href="/signup/patient">
              Sign Up
            </a>
          </button>
          <button className="lg:hidden ml-7">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="flex lg:space-x-5 max-lg:space-y-2 max-lg:block max-lg:w-full">
          <li className="max-lg:border-b max-lg:bg-[#007bff] max-lg:py-2 px-3 max-lg:rounded">
            <a
              href="/"
              className="lg:hover:text-[#007bff] text-[#007bff] max-lg:text-white block font-semibold text-15px"
            >
              Home
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              href="/#about"
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
            >
              About
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              href="/services"
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
            >
              Services
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              href="/signup/doctor"
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
            >
              Careers
            </a>
          </li>
          <li className="max-lg:border-b max-lg:py-2 px-3 max-lg:rounded">
            <a
              href="/policy"
              className="lg:hover:text-[#007bff] text-gray-500 block font-semibold text-15px"
            >
              Policy
            </a>
          </li>
        </ul>
      </div>) : (
        <div className="flex flex-wrap items-center justify-between gap-5 relative">
          {/* replace with clinic logo */}
          <a href="javascript:void(0)">
            <div className="flex">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Clinic Logo"
              />

              <span className="ms-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Vite Clinics
              </span>
            </div>
          </a>
          <div className="flex lg:order-1 max-sm:ml-auto">
            <button onClick={() => dispatch(logoutAction())} className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
              Logout
            </button>
            <button className="lg:hidden ml-7">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;