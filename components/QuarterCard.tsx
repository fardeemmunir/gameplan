import React from "react";
import { Droppable } from "react-beautiful-dnd";

import ScheduleList from "./ScheduleList";
import QuarterOverview from "./QuarterOverview";
import { Class } from "../lib/reducer";

interface Props {
  classes: Class[];
  id: string;
  isDropDisabled: boolean;
  quarter: string;
}

const QuarterCard = ({ classes, id, quarter, isDropDisabled }: Props) => (
  <div className="w-full md:w-1/3 max-w-xs px-2 mb-4 flex">
    <div
      className={
        "w-full rounded bg-white relative flex flex-col transition-all duration-150 " +
        (isDropDisabled ? "bg-gray-300" : "bg-white")
      }
    >
      <style jsx>{`
        .shrink {
          transform: scale(0.95);
        }
        .drop-zone {
          min-height: 9rem;
        }
      `}</style>
      <header className="flex px-2 pt-2 justify-between items-center mb-4">
        <div className="relative">
          <h1
            className={
              "text-3xl leading-none capitalize transition-opacity duration-200 " +
              (isDropDisabled && "opacity-0")
            }
          >
            {quarter.toLowerCase()}
          </h1>
          <div
            className={
              "absolute select-none top-0 rounded text-sm p-2 inline-block bg-red-600 text-white font-bold opacity-0 transition-opacity duration-200 " +
              (isDropDisabled ? "opacity-100" : "opacity-0")
            }
          >
            Disabled
          </div>
        </div>

        <QuarterOverview
          quarterId={id}
          difficulty={classes.reduce((a, b) => a + b.difficulty, 0)}
          interest={classes.reduce((a, b) => a + b.interest, 0)}
        />
      </header>
      <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
        {(provided, snapshot) => (
          <article
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              "drop-zone transition-bg flex-1 pt-2 px-2 rounded-b " +
              (snapshot.isDraggingOver ? "bg-gray-300" : "transparent")
            }
          >
            <ScheduleList classes={classes} />

            {provided.placeholder}
            {classes.length > 5 && (
              <p className="text-red-500 text-sm tracking-wide font-bold mt-4">
                Overload
              </p>
            )}
          </article>
        )}
      </Droppable>
    </div>
  </div>
);

export default QuarterCard;
