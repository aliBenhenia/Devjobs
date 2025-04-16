
import React from "react";


const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
            <h1 className="text-white text-2xl">Job Board</h1>
            </div>
        </nav>
      <main>{children}</main>
    </>
  );
};

export default NavbarLayout;
