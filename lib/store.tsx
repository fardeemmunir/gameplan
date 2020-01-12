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
  classList: [],
  schedule: {}
};

const localStorageKey = "GAMEPLAN.NU";

export const StoreProvider = ({ children, stateFromServer }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (stateFromServer)
      return Object.assign({}, initialState, stateFromServer);

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
