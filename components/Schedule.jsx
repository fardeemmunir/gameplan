import React, { useContext } from "react";
import QuarterCard from "./QuarterCard";
import Store from "../lib/store";
import { DragDropContext } from "react-beautiful-dnd";

const years = ["FRESHMAN" /* , "Sophmore", "Junior", "Senior" */];
const quarters = ["FALL", "WINTER", "SPRING"];
const yearsAndQuarters = [];

years.forEach(year => {
  return quarters.forEach(quarter => yearsAndQuarters.push({ year, quarter }));
});

const schedule = {
  FRESHMAN_FALL: ["GEN_ENG 205-1", "DSGN 106-1"],
  FRESHMAN_WINTER: ["GEN_ENG 205-2", "COMP_SCI 212"],
  FRESHMAN_SPRING: ["GEN_ENG 205-3", "DSGN 106-2"]
};

const Schedule = () => {
  const { classList } = useContext(Store);

  return (
    <div className="w-full mb-10">
      <p className="text-center text-gigantic opacity-25 font-bold">Schedule</p>

      <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black">
        <DragDropContext onDragEnd={result => console.log(result)}>
          <div className="flex flex-wrap -mx-2">
            {yearsAndQuarters.map(({ year, quarter }, i) => (
              <QuarterCard
                key={i}
                year={year}
                quarter={quarter}
                classes={classList.filter(({ code }) =>
                  schedule[year + "_" + quarter].includes(code)
                )}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Schedule;
