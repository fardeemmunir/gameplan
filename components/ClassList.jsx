import React, { useContext } from "react";

import Store from "../lib/store";

const ClassList = () => {
  const { classList } = useContext(Store);

  return (
    <div className="list">
      {classList.map((classInfo, i) => (
        <div
          key={i}
          className="w-40 rounded p-2 bg-purple-500 shadow flex flex-col justify-between"
        >
          <header className="mb-3">
            <h2 className="font-bold text-xs tracking-widest font-mono">
              {classInfo.code}
            </h2>
            <h1>{classInfo.name}</h1>
          </header>

          <footer className="flex justify-between">
            <div className="text-sm meta relative">
              <span className="cursor-pointer">
                {classInfo.difficulty} – 
                {classInfo.quarterPref.map(name => name[0]).join()}
              </span>

              <div className="bg-black  absolute meta__tooltip text-white border border-gray-800 border-l-4 w-32 p-1 text-xs">
                <p>Difficulty: {classInfo.difficulty}/5</p>
                <p>
                  Quarter:{" "}
                  <span className="capitalize">
                    {classInfo.quarterPref.join("/").toLowerCase()}
                  </span>{" "}
                </p>
              </div>
            </div>

            <button className="text-xs p-1 bg-purple-600 hover:bg-purple-600 leading-none rounded cursor-pointer">
              Edit
            </button>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
