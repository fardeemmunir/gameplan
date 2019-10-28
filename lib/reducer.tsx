import { initialState, ClassInfoInterface } from "./store";

interface ActionInterface {
  type: "ADD_CLASS" | "EDIT_CLASS" | "FINISH_EDITING_CLASS";
  payload: ClassInfoInterface & EditClassPayload;
}

interface EditClassPayload {
  classCode: string;
}

function reducer(state = initialState, action: ActionInterface) {
  switch (action.type) {
    case "ADD_CLASS":
      const classList = Array.from(state.classList);
      const docIndex = classList.findIndex(
        ({ code }) => code === action.payload.code
      );

      if (docIndex !== -1)
        // This class exists so remove the current defintiion
        // and update it with the new payload
        classList[docIndex] = action.payload;
      // classList.splice(docIndex, 1, action.payload);
      else classList.push(action.payload);

      return {
        ...state,
        classList
      };
    case "EDIT_CLASS":
      return {
        ...state,
        editClass: action.payload.classCode
      };
    case "FINISH_EDITING_CLASS":
      return {
        ...state,
        editClass: ""
      };
    default:
      return state;
  }
}

export default reducer;
