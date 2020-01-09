import React, { createContext, useReducer, useEffect } from "react";

import reducer from "./reducer";

export interface StoreInterface {
  classList: ClassInfoInterface[];
  editClass: string;
  schedule: ScheduleInterface;
  dispatch: Function;
}

export interface ClassInfoInterface {
  code: string;
  name: string;
  prereqs: string[];
  difficulty: number;
  interest: number;
  quarterPref: string[];
}

export interface ScheduleInterface {
  [key: string]: string[];
}

const Store = createContext<Partial<StoreInterface>>({});

export const initialState = {
  editClass: "",
  classList: [
    {
      code: "ES_APPM 252-1",
      name: "Multivariable Differential Calculus",
      quarterPref: ["FALL"],
      interest: 1,
      difficulty: 3,
      prereqs: []
    },
    {
      code: "ES_APPM 252-2",
      name: "Multivariable Integral Calculus",
      quarterPref: ["WINTER"],
      difficulty: 4,
      interest: 1,
      prereqs: ["ES_APPM 252-1"]
    },
    {
      code: "COMP_SCI 111",
      name: "Intro to Programming",
      quarterPref: ["FALL"],
      difficulty: 1,
      interest: 1,
      prereqs: ["ES_APPM 252-1"]
    }
  ],
  schedule: {}
};

const localStorageKey = "GAMEPLAN.NU";

export const StoreProvider = ({ children, stateFromServer }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (stateFromServer) return stateFromServer;

    if (typeof localStorage !== "undefined") {
      const classList =
        JSON.parse(localStorage.getItem(`${localStorageKey}_CLASSLIST`)) ||
        initialState.classList;
      const schedule =
        JSON.parse(localStorage.getItem(`${localStorageKey}_SCHEDULE`)) ||
        initialState.schedule;

      return {
        ...initialState,
        classList,
        schedule
      };
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    if (stateFromServer !== null) {
      return;
    }

    localStorage.setItem(
      `${localStorageKey}_CLASSLIST`,
      JSON.stringify(state.classList)
    );
    localStorage.setItem(
      `${localStorageKey}_SCHEDULE`,
      JSON.stringify(state.schedule)
    );
  }, [state]);

  return (
    <Store.Provider value={{ ...state, dispatch }}>{children}</Store.Provider>
  );
};

export default Store;
