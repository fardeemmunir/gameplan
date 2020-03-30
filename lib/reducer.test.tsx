import reducer, {
  initialState,
  addOrUpdateClass,
  removeClass,
  setClassToEdit,
  toggleLock
} from "./reducer";

const classToAdd = {
  id: "123",
  code: "code",
  name: "my class",
  prereqs: [],
  difficulty: 0,
  interest: 0,
  quarterPref: []
};

test("Class is added if it already doesn't exist", () => {
  const output = {
    ...initialState,
    classList: [classToAdd]
  };

  expect(reducer(initialState, addOrUpdateClass(classToAdd))).toEqual(output);
});

test("Class is not added if it already exists", () => {
  const state = { ...initialState, classList: [classToAdd] };

  expect(reducer(state, addOrUpdateClass(classToAdd))).toEqual(state);
});

test("Class is updated appropriately", () => {
  const state = { ...initialState, classList: [classToAdd] };

  classToAdd.name = "My updated class";
  expect(reducer(state, addOrUpdateClass(classToAdd))).toEqual(state);
});

test("If class has a new prereq, it gets automatically added", () => {
  classToAdd.prereqs.push("some_class");
  const output = reducer(initialState, addOrUpdateClass(classToAdd));
  expect(output).toEqual({
    ...initialState,
    classList: [
      classToAdd,
      {
        id: output.classList[1].id,
        name: "",
        prereqs: [],
        interest: 0,
        code: "some_class",
        difficulty: 0,
        quarterPref: []
      }
    ]
  });
});

test("Class is removed from list", () => {
  const state = {
    ...initialState,
    classList: [classToAdd]
  };

  expect(reducer(state, removeClass(classToAdd.id))).toEqual(initialState);
});

test("Class is removed from schedule if it exists", () => {
  const state = {
    ...initialState,
    classList: [classToAdd],
    schedule: {
      locks: [],
      data: {
        FALL_0: [classToAdd.id]
      }
    }
  };

  expect(reducer(state, removeClass(classToAdd.id))).toEqual({
    ...initialState,
    schedule: {
      locks: [],
      data: {
        FALL_0: []
      }
    }
  });
});

test("If a class exists, it can be edited", () => {
  const state = {
    ...initialState,
    classList: [classToAdd]
  };
  expect(reducer(state, setClassToEdit(classToAdd.id))).toEqual({
    ...state,
    editClass: classToAdd.id
  });
});

test("If a class doesn't exist, then it cannot be edited", () => {
  const state = {
    ...initialState
  };
  expect(reducer(state, setClassToEdit(classToAdd.id))).toEqual({
    ...state
  });
});

test("Class editing can be empty", () => {
  expect(reducer(initialState, setClassToEdit(""))).toEqual({
    ...initialState,
    editClass: ""
  });
});

test("A quarter cannot be locked if it doesn't exist", () => {
  const state = {
    ...initialState,
    schedule: {
      data: {
        FALL_0: []
      },
      locks: []
    }
  };

  expect(reducer(state, toggleLock("QUARTER_DOESNT_EXIST"))).toEqual(state);
});

test("A quarter can be locked if it does exist", () => {
  const state = {
    ...initialState,
    schedule: {
      data: {
        FALL_0: []
      },
      locks: []
    }
  };

  expect(reducer(state, toggleLock("FALL_0"))).toEqual({
    ...state,
    schedule: {
      ...state.schedule,
      locks: ["FALL_0"]
    }
  });
});

test("A quarter is unlocked if it is already locked", () => {
  const state = {
    ...initialState,
    schedule: {
      data: {
        FALL_0: []
      },
      locks: ["FALL_0"]
    }
  };

  expect(reducer(state, toggleLock("FALL_0"))).toEqual({
    ...state,
    schedule: {
      ...state.schedule,
      locks: []
    }
  });
});
