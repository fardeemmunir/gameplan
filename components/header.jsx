import React from "react";

const Header = () => (
  <header className="py-8 text-white">
    <div className="flex justify-between items-center">
      <h1 className="uppercase text-xl tracking-widest">
        <a className="text-white" href="/">
          Gameplan
        </a>
      </h1>
      <h2 className="text-gray-300 text-xs italic opacity-75">
        Design Wonderful Semesters
      </h2>
    </div>
  </header>
);

export default Header;
