import React from "react";
import { Droppable } from "react-beautiful-dnd";

import ScheduleList from "./ScheduleList";

const QuarterCard = ({ classes, year, quarter }) => (
  <div className="w-1/3 px-2 mb-4 flex">
    <Droppable droppableId={year + quarter}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-full rounded p-2 bg-white"
        >
          <div className="flex justify-between">
            <div>
              <h1 className="text-sm uppercase font-bold tracking-widest">
                {year}
              </h1>
              <h1 className="text-3xl leading-none mb-4 capitalize">
                {quarter.toLowerCase()}
              </h1>
            </div>

            <QuarterOverview
              difficulty={(
                classes.reduce((a, b) => a + b.difficulty, 0) / classes.length
              ).toFixed(1)}
              interest={(
                classes.reduce((a, b) => a + b.interest, 0) / classes.length
              ).toFixed(1)}
            />
          </div>

          <ScheduleList classes={classes} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

const QuarterOverview = ({ difficulty, interest }) => (
  <div className="flex flex-col mb-8">
    <div className="text-right mb-2">
      <div className="p-2 font-mono text-sm font-bold text-white rounded bg-indigo-700 inline-block leading-none">
        {interest}
      </div>
      <p className="text-xs">Avg. Interest</p>
    </div>

    <div className="text-right mb-4">
      <div className="p-2 font-mono text-sm font-bold text-white rounded bg-red-700 inline-block leading-none">
        {difficulty}
      </div>
      <p className="text-xs">Avg. Difficulty</p>
    </div>
  </div>
);

export default QuarterCard;
