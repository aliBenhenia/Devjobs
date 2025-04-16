
import React from "react";


const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
            <h1 className="text-secondary">Job Board</h1>
            <h1 className="text-primary">Welcome to my homepage!</h1>
            </div>
        </nav>
      <main>{children}</main>
    </>
  );
};

export default NavbarLayout;
