import { createStore } from "redux";

import ClassListReducer from "./reducers/ClassList";

const store = createStore(ClassListReducer);

export default store;
