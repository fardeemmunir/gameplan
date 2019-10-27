import { initialState, ClassInfoInterface } from "./store";

interface ActionInterface {
  type: "ADD_CLASS" | "EDIT_CLASS" | "FINISH_EDITING_CLASS";
  payload: ClassInfoInterface & EditClassPayload;
}

interface EditClassPayload {
  classCode: string;
}

function reducer(state = initialState, action: ActionInterface) {
  console.log(action);

  switch (action.type) {
    case "ADD_CLASS":
      return {
        ...state,
        classList: state.classList.concat(action.payload)
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
