interface Class {
  name: string;
  difficulty: number;
  class_number: string;
  prereq: string[];
}

export default function ClassList(state: Class[] = [], action) {
  return state;
}
