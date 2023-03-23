import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-1/2">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="md:text-2xl font-medium">
          Noution Blog
        </Link>
        <div>
          <ul className="flex items-center text-sm py-4">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 md:text-xl hover:text-sky-900 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 md:text-xl hover:text-sky-900 transition-all duration-300"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-4 py-2 md:text-xl hover:text-sky-900 transition-all duration-300"
              >
                準備中
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
