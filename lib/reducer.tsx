import { initialState, ClassInfoInterface } from "./store";

interface ActionInterface {
  type: "ADD_CLASS";
  payload: ClassInfoInterface;
}

function reducer(state = initialState, action: ActionInterface) {
  console.log(action);

  switch (action.type) {
    case "ADD_CLASS":
      return {
        ...state,
        classList: state.classList.concat(action.payload)
      };
    default:
      return state;
  }
}

export default reducer;
