import React, { createContext, useReducer, useEffect, useContext } from "react";

import reducer, { initialState, Store as StoreData } from "./reducer";

interface Store extends StoreData {
  isDataFromServer: boolean;
  dispatch: (arg: any) => void;
}

const Store = createContext<Store>({
  ...initialState,
  isDataFromServer: false,
  dispatch: () => {}
});

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
    <Store.Provider
      value={{ ...state, isDataFromServer: !!stateFromServer, dispatch }}
    >
      {children}
    </Store.Provider>
  );
};

export const useStore = () => {
  return useContext(Store);
};

export default Store;
