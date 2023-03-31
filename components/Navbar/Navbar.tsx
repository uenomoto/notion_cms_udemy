import Link from "next/link";
import React from "react";
import ChangeThemeButton from "../Button/ChangeThemeButton";

export const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-1/2">
      <div className="container flex items-center justify-end mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 min-375:-translate-y-1">
        <div>
          <ul className="flex items-center text-sm py-4">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 xl:text-4xl sm:text-xl font-bold md:text-gray-600 sm:text-sky-900 hover:text-white md:hover:text-sky-500 transition-all duration-300 text-shadow"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/motoki_1995"
                className="block px-4 py-2 mr-2 xl:text-4xl sm:text-xl font-bold md:text-gray-600 sm:text-sky-900 hover:text-white md:hover:text-sky-500 transition-all duration-300 text-shadow"
              >
                Twitter
              </Link>
            </li>
            <li>
              <ChangeThemeButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
