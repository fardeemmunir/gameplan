import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import QuarterCard from "./QuarterCard";
import Store from "../lib/store";
import scheduleBuilder from "../lib/utils/scheduler";
import sortSchedule from "../lib/utils/sortSchedule";

const Schedule = () => {
  const { classList, schedule, dispatch } = useContext(Store);

  function updateSchedule(result) {
    const { destination, source, draggableId } = result;
    const updatedSchedule = Object.assign({}, schedule);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Remove item from source
    const newSource = Array.from(schedule[source.droppableId] || []);
    newSource.splice(source.index, 1);

    // Add item to destination
    const newDest = Array.from(schedule[destination.droppableId] || []);

    // If user is reordering items in the same column
    if (destination.droppableId === source.droppableId) {
      newSource.splice(destination.index, 0, draggableId);
      updatedSchedule[source.droppableId] = newSource;
    } else {
      newDest.splice(destination.index, 0, draggableId);
      updatedSchedule[source.droppableId] = newSource;
      updatedSchedule[destination.droppableId] = newDest;
    }

    // console.log(updatedSchedule);
    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: {
        updatedSchedule
      }
    });
  }

  function generateSchedule() {
    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: {
        updatedSchedule: scheduleBuilder(classList)
      }
    });
  }

  function clearSchedule() {
    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: {
        updatedSchedule: {}
      }
    });
  }

  return (
    <div className="w-full mb-10">
      <p className="text-center text-gigantic opacity-25 font-bold">Schedule</p>

      <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black relative z-10 schedule-chart mb-12">
        {Object.keys(schedule).length === 0 ? (
          <div className="w-full flex flex-wrap justify-center">
            <button className="form__submit" onClick={generateSchedule}>
              Generate
            </button>
          </div>
        ) : (
          <>
            <DragDropContext onDragEnd={updateSchedule}>
              <div className="flex flex-wrap -mx-2">
                {sortSchedule(schedule).map(({ quarter, classes, id }, i) => (
                  <QuarterCard
                    key={i}
                    id={id}
                    quarter={quarter}
                    classes={classes.map(code =>
                      classList.find(info => info.code === code)
                    )}
                  />
                ))}
              </div>
            </DragDropContext>
            <div className="w-full flex justify-center">
              <button className="form__submit mr-4" onClick={generateSchedule}>
                Reset Schedule
              </button>
              <button className="form__submit" onClick={clearSchedule}>
                Clear Schedule
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Schedule;
