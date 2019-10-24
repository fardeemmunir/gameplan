interface Class {
  class_number: string;
  name: string;
  difficulty: number;
  prereq: string[];
}

interface State {
  classList: Class[];
}

const initialState: State = {
  classList: []
};

function ClassListReducer(state: State = initialState, action) {
  return state;
}

export default ClassListReducer;
