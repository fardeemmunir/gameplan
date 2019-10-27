import React from "react";

import difficultyToColor from "../lib/difficultyToColor";

const ClassCard = ({ code, name, difficulty, quarterPref }) => (
  <div
    className=" w-64 rounded p-2 bg-purple-500 shadow flex flex-col justify-between"
    style={{
      backgroundColor: difficultyToColor(difficulty)
    }}
  >
    <header className="mb-3">
      <h2 className="font-bold text-xs tracking-widest font-mono">{code}</h2>
      <h1>{name}</h1>
    </header>

    <footer className="flex justify-between items-end">
      <div className="text-sm meta relative">
        <p>
          <span className="opacity-75">Difficulty: </span>
          {difficulty} / 5
        </p>
        <p>
          <span className="opacity-75">Quarter:</span>{" "}
          <span className="capitalize">
            {quarterPref.join("/").toLowerCase()}
          </span>{" "}
        </p>
      </div>

      <div>
        <button className="text-xs p-1 bg-black opacity-50 hover:bg-purple-600 leading-none rounded cursor-pointer">
          Edit
        </button>
      </div>
    </footer>
  </div>
);

export default ClassCard;
