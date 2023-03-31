import React from "react";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import { Motions } from "../src/utils/Motions";

export const Layout = ({ children }) => {
  return (
    <Motions>
      <div className="flex flex-col min-h-screen">
        <img
          src="/1.png"
          className="md:w-full h-96 object-fill hidden md:block mx-auto relative"
        />
        <img
          src="/2.png"
          className="w-full h-full md:hidden min-320:block max-767:block mx-auto relative"
        />
        <Navbar />
        <main className="flex-1 grid xl:grid-cols-12 xl:w-12/12 xl:mx-auto">
          {children}
        </main>
        <Footer />
      </div>
    </Motions>
  );
};
