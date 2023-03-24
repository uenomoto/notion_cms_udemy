import Link from "next/link";
import React from "react";
import ChangeThemeButton from "../Button/ChangeThemeButton";

export const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-1/2">
      <div className="flex justify-between">
        <img src="/image2.png" className="md:w-64 md:h-64 w-32 h-32 mx-auto" />
        <img src="/image1.png" className="md:w-64 md:h-64 w-32 h-32 mx-auto" />
      </div>
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="md:text-2xl font-bold">
          エンジニアへの道のり🐣
        </Link>
        <div>
          <ul className="flex items-center text-sm py-4">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 md:text-xl font-bold hover:text-sky-900 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="https://twitter.com/motoki_1995"
                className="block px-4 py-2 mr-2 md:text-xl font-bold hover:text-sky-900 transition-all duration-300"
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
