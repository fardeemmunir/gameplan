import React from "react";
import { Droppable } from "react-beautiful-dnd";

import ScheduleList from "./ScheduleList";
import QuarterOverview from "./QuarterOverview";

const QuarterCard = ({ classes, id, quarter, isDropDisabled }) => (
  <div className="w-1/3 px-2 mb-4 flex">
    <div className="w-full rounded bg-white">
      <div className="flex px-2 pt-2 justify-between items-end mb-4">
        <div>
          <h1 className="text-3xl leading-none capitalize">
            {quarter.toLowerCase()}
          </h1>
        </div>

        <QuarterOverview
          difficulty={classes.reduce((a, b) => a + b.difficulty, 0)}
          interest={classes.reduce((a, b) => a + b.interest, 0)}
        />
      </div>
      <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              "min-h-24 p-2 rounded-b " +
              (snapshot.isDraggingOver ? "bg-gray-300" : "bg-white")
            }
          >
            <ScheduleList classes={classes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  </div>
);

export default QuarterCard;
