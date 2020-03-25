import { v4 as uuidv4 } from "uuid";

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

type AddOrUpdateClass = {
  type: "ADD_OR_UPDATE_CLASS";
  payload: Class;
};

type RemoveClass = {
  type: "REMOVE_CLASS";
  payload: string;
};

type SetClassToEdit = {
  type: "SET_CLASS_TO_EDIT";
  payload: string;
};

type StoreActions = AddOrUpdateClass | RemoveClass | SetClassToEdit;

const storeReducer = function(state: Store, action: StoreActions): Store {
  switch (action.type) {
    case "ADD_OR_UPDATE_CLASS": {
      const classList = Array.from(state.classList);
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

      return {
        ...state,
        classList,
        editClass: ""
      };
    }

    case "REMOVE_CLASS": {
      const classId = action.payload;
      const { classList, schedule } = Object.assign({}, state);
      const classIndex = classList.findIndex(({ id }) => id === classId);

      classList.splice(classIndex, 1);

      for (let quarter in schedule.data) {
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

      return {
        ...state,
        classList,
        schedule,
        editClass: ""
      };
    }

    case "SET_CLASS_TO_EDIT": {
      return {
        ...state,
        editClass: action.payload
      };
    }

    default:
      return state;
  }
};

const actions = {
  addOrUpdateClass(classInfo: Class): AddOrUpdateClass {
    return {
      type: "ADD_OR_UPDATE_CLASS",
      payload: classInfo
    };
  },

  removeClass(id: string): RemoveClass {
    return {
      type: "REMOVE_CLASS",
      payload: id
    };
  },

  setClassToEdit(id: string): SetClassToEdit {
    return {
      type: "SET_CLASS_TO_EDIT",
      payload: id
    };
  }
};

export default storeReducer;

export const { addOrUpdateClass, removeClass, setClassToEdit } = actions;
