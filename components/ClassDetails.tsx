import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import ClassCard from "./ClassCard";
import { setClassToEdit } from "../lib/reducer";
import { useStore } from "../lib/store";

const ClassDetails = () => {
  const [currentClass, setCurrentClass] = useState(null);
  const { classList, editClass, dispatch } = useStore();

  useEffect(() => {
    if (!editClass) return;
    setCurrentClass(classList.find(({ id }) => id === editClass));
  }, [editClass, classList]);

  return (
    <div className="relative z-20">
      <style jsx>{`
        .class-more-details {
          position: fixed;
          bottom: 2rem;
          z-index: 2;
        }
      `}</style>

      <CSSTransition
        in={editClass.length > 0}
        timeout={200}
        unmountOnExit
        classNames="fade-in-card"
      >
        <div className="class-more-details ml-8">
          <ClassCard
            {...currentClass}
            closeCard={() => dispatch(setClassToEdit(""))}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default ClassDetails;
