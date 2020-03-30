import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useStore } from "../lib/store";
import color from "../lib/utils/scoreToColor";
import { Class, setClassToEdit } from "../lib/reducer";

interface Props {
  classes: Class[];
}

const ScheduleList = ({ classes }: Props) => {
  const { isDataFromServer, dispatch } = useStore();

  return (
    <ul className="list-none">
      <style jsx>{`
        .schedule-item:last-of-type {
          // margin-bottom: 0;
        }
      `}</style>
      {classes.map((classInfo, i) => (
        <Draggable
          key={classInfo.id}
          isDragDisabled={isDataFromServer}
          draggableId={classInfo.id}
          index={i}
        >
          {provided => (
            <li
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              className="schedule-item text-white p-2 rounded mb-2 block"
              style={{
                backgroundColor: color(
                  classInfo.interest - classInfo.difficulty
                ),
                ...provided.draggableProps.style
              }}
              onClick={() => {
                dispatch(setClassToEdit(classInfo.id));
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
