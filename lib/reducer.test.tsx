import reducer, { initialState, addOrUpdateClass } from "./reducer";

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

  expect(reducer(initialState, addOrUpdateClass(classToAdd))).toStrictEqual(
    output
  );
});

test("Class is not added if it already exists", () => {
  const state = { ...initialState, classList: [classToAdd] };

  expect(reducer(state, addOrUpdateClass(classToAdd))).toStrictEqual(state);
});

test("Class is updated appropriately", () => {
  const state = { ...initialState, classList: [classToAdd] };

  classToAdd.name = "My updated class";
  expect(reducer(state, addOrUpdateClass(classToAdd))).toStrictEqual(state);
});

test("If class has a new prereq, it gets automatically added", () => {
  classToAdd.prereqs.push("some_class");
  const output = reducer(initialState, addOrUpdateClass(classToAdd));

  expect(output).toStrictEqual({
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
