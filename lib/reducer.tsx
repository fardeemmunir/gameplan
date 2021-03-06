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

export type ScheduleWithLocks = {
  locks: string[];
  data: Schedule;
};

export type EditClass = string;

export type Store = {
  classList: Class[];
  schedule: ScheduleWithLocks;
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

type UpdateSchedule = {
  type: "UPDATE_SCHEDULE";
  payload: Schedule;
};

type ToggleLock = {
  type: "TOGGLE_LOCK";
  payload: string;
};

type StoreActions =
  | AddOrUpdateClass
  | RemoveClass
  | SetClassToEdit
  | UpdateSchedule
  | ToggleLock;

const storeReducer = function(state: Store, action: StoreActions): Store {
  switch (action.type) {
    case "ADD_OR_UPDATE_CLASS": {
      const classList = Array.from(state.classList);
      const classToBeAdded = action.payload;
      const classIndexIfExists = classList.findIndex(
        ({ id }) => id === classToBeAdded.id
      );

      if (classIndexIfExists === -1) {
        classToBeAdded.id = uuidv4();
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

      for (const quarter in schedule.data) {
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
      if (
        action.payload !== "" &&
        !state.classList.find(({ id }) => id === action.payload)
      )
        return state;

      return {
        ...state,
        editClass: action.payload
      };
    }

    case "UPDATE_SCHEDULE": {
      return {
        ...state,
        schedule: {
          locks: state.schedule.locks,
          data: action.payload
        }
      };
    }

    case "TOGGLE_LOCK": {
      const quarterToggleLock = action.payload;

      if (!Object.keys(state.schedule.data).includes(quarterToggleLock))
        return { ...state };

      const schedule = Object.assign({}, state.schedule);
      const index = schedule.locks.findIndex(
        currentLock => currentLock === quarterToggleLock
      );

      if (index !== -1) {
        schedule.locks.splice(index, 1);
      } else {
        schedule.locks.push(quarterToggleLock);
      }

      return { ...state, schedule };
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
  },

  updateSchedule(schedule: Schedule): UpdateSchedule {
    return {
      type: "UPDATE_SCHEDULE",
      payload: schedule
    };
  },

  toggleLock(quarter: string): ToggleLock {
    return {
      type: "TOGGLE_LOCK",
      payload: quarter
    };
  }
};

export default storeReducer;

export const {
  addOrUpdateClass,
  removeClass,
  setClassToEdit,
  updateSchedule,
  toggleLock
} = actions;
