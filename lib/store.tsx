import React, { createContext, useReducer } from "react";

import reducer from "./reducer";

export interface StoreInterface {
  classList: ClassInfoInterface[];
  dispatch: Function;
}

export interface ClassInfoInterface {
  code: string;
  name: string;
  prereqs: string[];
  difficulty: number;
  quarterPref: string[];
}

const Store = createContext<Partial<StoreInterface>>({
  classList: []
});

export const initialState = {
  classList: [
    {
      code: "ES_APPM 252-1",
      name: "Multivariable Differential Calculus",
      quarterPref: ["FALL"],
      difficulty: 3,
      prereqs: []
    },
    {
      code: "ES_APPM 252-2",
      name: "Multivariable Integral Calculus",
      quarterPref: ["WINTER"],
      difficulty: 1,
      prereqs: ["ES_APPM 252-1"]
    }
  ]
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ ...state, dispatch }}>{children}</Store.Provider>
  );
};

export default Store;
