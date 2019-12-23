import React from "react";
import { Droppable } from "react-beautiful-dnd";

import ScheduleList from "./ScheduleList";
import QuarterOverview from "./QuarterOverview";

const QuarterCard = ({ classes, id, quarter }) => (
  <div className="w-1/3 px-2 mb-4 flex">
    <div className="w-full rounded p-2 bg-white">
      <div className="flex justify-between items-end mb-8">
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
      <Droppable droppableId={id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-24"
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
