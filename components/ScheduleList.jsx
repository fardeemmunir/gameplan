import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import Store from "../lib/store";
import difficultyToColor from "../lib/utils/difficultyToColor";

const ScheduleList = ({ classes }) => {
  const { dispatch } = useContext(Store);

  return (
    <ul className="list-none">
      <style jsx>{`
        .schedule-item:last-of-type {
          margin-bottom: 0;
        }
      `}</style>
      {classes.map((classInfo, i) => (
        <Draggable key={classInfo.code} draggableId={classInfo.code} index={i}>
          {provided => (
            <li
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="schedule-item text-white p-2 rounded mb-2 block"
              style={{
                backgroundColor: difficultyToColor(classInfo.difficulty),
                ...provided.draggableProps.style
              }}
              onClick={() => {
                dispatch({
                  type: "EDIT_CLASS",
                  payload: {
                    classCode: classInfo.code
                  }
                });
              }}
            >
              <h2 className="text-xs tracking-widest font-mono">
                {classInfo.code}
              </h2>
            </li>
          )}
        </Draggable>
      ))}
    </ul>
  );
};

export default ScheduleList;
