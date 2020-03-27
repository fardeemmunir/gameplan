import React, { useState } from "react";
import Lock from "./utils/Lock";
import { useStore } from "../lib/store";

interface Props {
  quarterId: string;
  difficulty: number;
  interest: number;
}

const QuarterOverview = ({ quarterId, difficulty, interest }: Props) => {
  const { schedule } = useStore();
  const [isLocked, setIsLocked] = useState(false);

  const score = interest - difficulty;

  function scoreToColor(score: number) {
    if (score === 0) return "text-green-500";
    else if (score > 0) return "text-blue-500";
    else return "text-red-700";
  }

  return (
    <div className="flex justify-center mt-1">
      <p className="text-xs pr-2 mr-2 border-r">
        Score:{" "}
        <span className={"font-bold " + scoreToColor(score)}>{score}</span>{" "}
      </p>

      <Lock
        isLocked={schedule.locks.includes(quarterId)}
        onClick={() => {}}
        className={`w-4 cursor-pointer transform transition-all duration-100 ${
          schedule.locks.includes(quarterId)
            ? "opacity-100 scale-125"
            : "opacity-50"
        }`}
      />
    </div>
  );
};

export default QuarterOverview;
