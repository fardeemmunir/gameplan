import React, { useContext, useState, useLayoutEffect } from "react";
import QuarterCard from "./QuarterCard";
import Store from "../lib/store";
import { DragDropContext } from "react-beautiful-dnd";

const years = ["FRESHMAN" /* , "Sophmore", "Junior", "Senior" */];
const quarters = ["FALL", "WINTER", "SPRING"];
const yearsAndQuarters = [];

years.forEach(year => {
  return quarters.forEach(quarter => yearsAndQuarters.push({ year, quarter }));
});

const Schedule = () => {
  const [schedule, setSchedule] = useState({
    FRESHMAN_FALL: [],
    FRESHMAN_WINTER: [],
    FRESHMAN_SPRING: []
  });
  const { classList } = useContext(Store);

  useLayoutEffect(() => {
    setSchedule({
      FRESHMAN_FALL: ["ES_APPM 252-1"],
      FRESHMAN_WINTER: ["ES_APPM 252-2"],
      FRESHMAN_SPRING: ["COMP_SCI 111"]
    });
  }, []);

  function updateSchedule(result) {
    console.log(result);
    // Remove item from source
    const newSource = Array.from(schedule[result.source.droppableId]);
    newSource.splice(result.source.index, 1);

    const newDest = Array.from(schedule[result.destination.droppableId]);
    if (result.destination.droppableId === result.source.droppableId) {
      newDest.splice(result.source.index, 1);
    }
    newDest.splice(result.destination.index, 0, result.draggableId);

    setSchedule(
      Object.assign({}, schedule, {
        [result.source.droppableId]: newSource,
        [result.destination.droppableId]: newDest
      })
    );

    // Add item to destination
  }

  return (
    <div className="w-full mb-10">
      <p className="text-center text-gigantic opacity-25 font-bold">Schedule</p>

      <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black">
        <DragDropContext onDragEnd={updateSchedule}>
          <div className="flex flex-wrap -mx-2">
            {yearsAndQuarters.map(({ year, quarter }, i) => (
              <QuarterCard
                key={i}
                year={year}
                quarter={quarter}
                classes={schedule[year + "_" + quarter].map(code =>
                  classList.find(info => info.code === code)
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
