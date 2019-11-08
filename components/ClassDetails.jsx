import React, { useState, useContext, useEffect } from "react";
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
    editClass.length > 0 && (
      <div className="relative">
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
      </div>
    )
  );
};

export default ClassDetails;
