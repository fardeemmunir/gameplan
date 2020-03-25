import React, { useContext, useState } from "react";
import { DragDropContext, DragStart, DropResult } from "react-beautiful-dnd";
import { produce } from "immer";

import QuarterCard from "./QuarterCard";
import Store, { useStore } from "../lib/store";
import { updateSchedule } from "../lib/reducer";
import scheduleBuilder from "../lib/utils/scheduler";
import sortSchedule from "../lib/utils/sortSchedule";

const useScheduling = () => {
  const [classBeingDragged, setClassBeingDragged] = useState(null);
  const { classList, schedule, dispatch } = useContext(Store);
  const sortedSchedule = sortSchedule(schedule.data);

  function updateScheduleAfterDrop(result: DropResult) {
    setClassBeingDragged(null);
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const update = produce(schedule.data, draft => {
      draft[source.droppableId].splice(source.index, 1);
      draft[destination.droppableId].splice(destination.index, 0, draggableId);
    });

    dispatch(updateSchedule(update));
  }

  function isDropDisabled(quarter: string, currentQuarterIndex: number) {
    if (!classBeingDragged) return false;

    const classInfo = classList.find(({ id }) => id === classBeingDragged);

    const classesCompletedTillNow = sortedSchedule
      .slice(0, currentQuarterIndex)
      .map(({ classes }) => classes)
      .flat();

    // Flip the boolean since the function is asking if the drop is disabled or not
    // Condtitions for being enabled
    // 1. Quarter in quarter pref
    // 2. All the prereqs of the class being dragged has been fulfilled and is contained in classesCompletedTillNow
    // 3. All classes in ClassCompletedTillNow doesnt have a prereq that includes the classBeing dragged. Makes
    //    sure that you can't place a class behind a class that has a dependency on it
    return !(
      classInfo.quarterPref.includes(quarter) && // [1]
      classInfo.prereqs.every(id => classesCompletedTillNow.includes(id)) && // [2]
      classesCompletedTillNow.every(id => {
        // [3]
        const classInfo = classList.find(info => info.id === id);
        return !classInfo.prereqs.includes(classBeingDragged);
      })
    );
  }

  return {
    schedule,
    sortedSchedule,
    isDropDisabled,
    updateScheduleAfterDrop,

    generateSchedule() {
      dispatch(updateSchedule(scheduleBuilder(classList)));
    },

    clearSchedule() {
      dispatch(updateSchedule({}));
    },

    saveDraggedClass(payload: DragStart) {
      setClassBeingDragged(payload.draggableId);
    }
  };
};

const Schedule = () => {
  const { classList } = useStore();
  const {
    schedule,
    sortedSchedule,
    generateSchedule,
    isDropDisabled,
    clearSchedule,
    saveDraggedClass,
    updateScheduleAfterDrop
  } = useScheduling();

  if (Object.keys(schedule.data).length === 0) {
    return (
      <div className="w-full flex flex-wrap justify-center">
        <button className="form__submit" onClick={generateSchedule}>
          Generate
        </button>
      </div>
    );
  }

  return (
    <div>
      <DragDropContext
        onDragStart={saveDraggedClass}
        onDragEnd={updateScheduleAfterDrop}
      >
        <div className="flex flex-wrap -mx-2">
          {sortedSchedule.map(({ quarter, classes, id }, i) => (
            <QuarterCard
              key={i}
              id={id}
              quarter={quarter}
              isDropDisabled={isDropDisabled(quarter, i)}
              classes={classes.map(id =>
                classList.find(info => info.id === id)
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
    </div>
  );
};

export default () => (
  <div className="w-full mb-10">
    <style jsx>{`
      .text-gigantic {
        font-size: 7rem;
      }
    `}</style>
    <h1 className="text-center text-5xl text-gigantic opacity-25 font-bold">
      Schedule
    </h1>

    <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black relative z-10 schedule-chart mb-12">
      <Schedule />
    </div>
  </div>
);
