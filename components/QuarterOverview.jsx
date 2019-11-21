import React from "react";

const QuarterOverview = ({ difficulty, interest }) => (
  <div className="flex flex-col">
    <div className="text-right mb-2">
      <div className="px-3 py-2 font-mono text-xs font-bold text-white rounded bg-indigo-700 inline-block leading-none">
        {interest}
      </div>
      <p className="text-xs">Total Interest</p>
    </div>

    <div className="text-right">
      <div className="px-3 py-2 font-mono text-xs font-bold text-white rounded bg-red-700 inline-block leading-none">
        {difficulty}
      </div>
      <p className="text-xs">Total Difficulty</p>
    </div>
  </div>
);

export default QuarterOverview;
