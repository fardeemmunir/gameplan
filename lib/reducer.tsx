import { initialState, ClassInfoInterface } from "./store";

interface ActionInterface {
  type: "ADD_CLASS";
  payload: ClassInfoInterface;
}

function reducer(state = initialState, action: ActionInterface) {
      return state;

export default reducer;
