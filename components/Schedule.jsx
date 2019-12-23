import React, { useContext } from "react";
import QuarterCard from "./QuarterCard";
import Store from "../lib/store";
import sortSchedule from "../lib/utils/sortSchedule";

import { DragDropContext } from "react-beautiful-dnd";

const Schedule = () => {
  const { classList, schedule, dispatch } = useContext(Store);

  function updateSchedule(result) {
    const { destination, source, draggableId } = result;

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
    newDest.splice(destination.index, 0, draggableId);

    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: {
        updatedSchedule: Object.assign({}, schedule, {
          [source.droppableId]: newSource,
          [destination.droppableId]: newDest
        })
      }
    });
  }

  function generateSchedule() {
    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: {
        updatedSchedule: {
          FALL_0: ["ES_APPM 252-1"],
          WINTER_0: ["ES_APPM 252-2"],
          SPRING_0: ["COMP_SCI 111", "COMP_SCI 211", "COMP_SCI 214"],
          FALL_1: ["COMP_SCI 213"]
        }
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
