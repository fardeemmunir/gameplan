import React from "react";
import difficultyToColor from "../lib/difficultyToColor";

const QuarterOverview = ({ difficulty, interest }) => (
  <div className="flex flex-col mb-8">
    <div className="text-right">
      <div className="p-2 font-mono text-sm font-bold text-white rounded bg-indigo-700 inline-block leading-none">
        {interest}
      </div>
      <p className="text-xs">Avg. Interest</p>
    </div>

    <div className="text-right mb-4">
      <div className="p-2 font-mono text-sm font-bold text-white rounded bg-red-700 inline-block leading-none">
        {difficulty}
      </div>
      <p className="text-xs">Avg. Difficulty</p>
    </div>
  </div>
);

const QuarterCard = ({ classes, year, quarter }) => {
  return (
    <div className="w-1/3 px-2 mb-4">
      <div className="border border-gray-200 rounded p-2 bg-white">
        <div className="flex justify-between">
          <div>
            <h1 className="text-sm uppercase font-bold tracking-widest">
              {year}
            </h1>
            <h1 className="text-3xl leading-none mb-4">{quarter}</h1>
          </div>

          <QuarterOverview
            difficulty={Math.floor(
              classes.reduce((a, b) => a + b.difficulty, 0) / classes.length
            )}
            interest={Math.floor(
              classes.reduce((a, b) => a + b.interest, 0) / classes.length
            )}
          />
        </div>

        <ul>
          {classes.map(classInfo => (
            <li
              key={classInfo.name}
              className="text-white p-2 rounded mt-2"
              style={{
                backgroundColor: difficultyToColor(classInfo.difficulty)
              }}
            >
              <h2 className="font-bold text-xs tracking-widest font-mono">
                {classInfo.code}
              </h2>
              <h1 className="text-sm">{classInfo.name}</h1>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuarterCard;
