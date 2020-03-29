import React from "react";
import { useStore } from "../lib/store";
import Schedule from "./Schedule";
import Graph from "./Graph";

const Visuals = () => {
  const { classList } = useStore();

  if (classList.length === 0) {
    return (
      <div className="my-48">
        <img className="w-1/4 mx-auto" src="/plan.png" alt="" />
        <p className="text-xl tracking-wider text-center opacity-50">
          Add some classes
        </p>
      </div>
    );
  } else {
    return (
      <>
        <Graph />
        <Schedule />
      </>
    );
  }
};

export default Visuals;
