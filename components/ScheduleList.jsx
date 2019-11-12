import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import Store from "../lib/store";
import difficultyToColor from "../lib/difficultyToColor";

const ScheduleList = ({ classes }) => {
  const { dispatch } = useContext(Store);

  return (
    <ul>
      {classes.map((classInfo, i) => (
        <Draggable
          key={classInfo.name}
          draggableId={classInfo.code.replace(" ", "-")}
          index={i}
        >
          {provided => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="text-white p-2 rounded mt-2"
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
            </div>
          )}
        </Draggable>
      ))}
    </ul>
  );
};

export default ScheduleList;
