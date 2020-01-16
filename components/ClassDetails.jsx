import React, { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import ClassCard from "./ClassCard";
import Store, { initialState } from "../lib/store";

const ClassDetails = () => {
  const [currentClass, setCurrentClass] = useState(initialState.classList[0]);
  const { classList, editClass, dispatch } = useContext(Store);

  useEffect(() => {
    if (!editClass) return;
    setCurrentClass(classList.find(({ code }) => code === editClass));
  }, [editClass, classList]);

  return (
    <div className="relative z-20">
      <CSSTransition
        in={editClass.length > 0}
        timeout={200}
        unmountOnExit
        classNames="fade-in-card"
      >
        <div className="class-more-details ml-8">
          <ClassCard
            {...currentClass}
            closeCard={() => {
              dispatch({
                type: "FINISH_EDITING_CLASS"
              });
            }}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default ClassDetails;
