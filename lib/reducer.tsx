import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//
// Types
//
export type Class = {
  id: string;
  code: string;
  name: string;
  prereqs: string[];
  difficulty: number;
  interest: number;
  quarterPref: string[];
};

export type Schedule = {
  [key: string]: string[];
};

export type EditClass = string;

export type Store = {
  classList: Class[];
  schedule: {
    data: Schedule;
    locks: string[];
  };
  editClass: EditClass;
};

//
// Reducer
//
export const initialState: Store = {
  classList: [],
  schedule: {
    data: {},
    locks: []
  },
  editClass: ""
};

const store = createSlice({
  name: "store",
  initialState,
  reducers: {
    addOrUpdateClass(state, action: PayloadAction<Class>) {
      const { classList } = state;
      const classToBeAdded = action.payload;
      const classIndexIfExists = classList.findIndex(
        ({ id }) => id === classToBeAdded.id
      );

      if (classIndexIfExists === -1) {
        classList.push(classToBeAdded);
      } else {
        classList[classIndexIfExists] = classToBeAdded;
      }

      for (let i = 0; i < classToBeAdded.prereqs.length; i++) {
        const prereqIdOrCode = classToBeAdded.prereqs[i];

        if (classList.find(({ id }) => id === prereqIdOrCode)) continue;

        const id = uuidv4();
        classToBeAdded.prereqs[i] = id;
        classList.push({
          id,
          name: "",
          prereqs: [],
          interest: 0,
          code: prereqIdOrCode,
          difficulty: 0,
          quarterPref: []
        });
      }
    },

    removeClass(state, action: PayloadAction<string>) {
      const classId = action.payload;
      const { classList, schedule } = state;
      const classIndex = classList.findIndex(({ id }) => id === classId);

      classList.splice(classIndex, 1);

      for (let quarter in schedule) {
        const classIdsInQuarter = schedule.data[quarter];
        const classIndexIfExists = classIdsInQuarter.findIndex(
          id => id === classId
        );

        if (classIndexIfExists === -1) {
          continue;
        } else {
          classIdsInQuarter.splice(classIndexIfExists, 1);
        }
      }

      state.editClass = "";
    },

    setClassToEdit(state, action: PayloadAction<string>) {
      state.editClass = action.payload;
    }
  }
});

export default store.reducer;

export const { addOrUpdateClass, removeClass, setClassToEdit } = store.actions;
