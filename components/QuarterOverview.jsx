import React from "react";

const QuarterOverview = ({ difficulty, interest }) => (
  <div className="flex flex-col mb-8">
    <div className="text-right mb-2">
      <div className="p-2 font-mono text-sm font-bold text-white rounded bg-indigo-700 inline-block leading-none">
        {interest}
      </div>
      <p className="text-xs">Total Interest</p>
    </div>

    <div className="text-right mb-4">
      <div className="p-2 font-mono text-sm font-bold text-white rounded bg-red-700 inline-block leading-none">
        {difficulty}
      </div>
      <p className="text-xs">Total Difficulty</p>
    </div>
  </div>
);

export default QuarterOverview;
