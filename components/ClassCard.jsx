import React from "react";

import difficultyToColor from "../lib/utils/difficultyToColor";

const ClassCard = ({
  code,
  name,
  difficulty,
  quarterPref = [],
  prereqs = [],
  interest,
  closeCard
}) => (
  <div
    className=" w-64 rounded p-2 bg-purple-500 shadow flex flex-col justify-between"
    style={{
      backgroundColor: difficultyToColor(difficulty)
    }}
  >
    <p
      className="absolute top-0 right-0 px-2 -my-1 text-2xl cursor-pointer"
      onClick={closeCard}
    >
      &times;
    </p>
    <header className="mb-3">
      <h2 className="font-bold text-xs tracking-widest font-mono">{code}</h2>
      <h1>{name}</h1>
    </header>

    <footer className="text-sm meta relative">
      <p>
        <span className="opacity-75">Interest: </span>
        {interest} / 5
      </p>
      <p>
        <span className="opacity-75">Difficulty: </span>
        {difficulty} / 5
      </p>
      <p>
        <span className="opacity-75">Quarter: </span>
        <span className="capitalize">
          {quarterPref.join("/").toLowerCase()}
        </span>{" "}
      </p>

      <p>
        <span className="opacity-75">Prerequisites: </span>
        <span className="capitalize">
          {prereqs.length > 0 ? prereqs.join(", ") : "None"}
        </span>{" "}
      </p>
    </footer>
  </div>
);

export default ClassCard;
