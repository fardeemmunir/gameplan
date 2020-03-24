import React from "react";

const QuarterOverview = ({ difficulty, interest }) => {
  const score = interest - difficulty;

  function scoreToColor(score) {
    if (score === 0) return "text-green-500";
    else if (score > 0) return "text-blue-500";
    else return "text-red-700";
  }

  return (
    <div className="flex flex-col justify-center">
      <div
        className={
          "py-1 font-mono text-xs text-right font-bold rounded inline-block leading-none " +
          scoreToColor(score)
        }
      >
        {score}
      </div>
      <p className="text-xs">Total Score</p>
    </div>
  );
};

export default QuarterOverview;
