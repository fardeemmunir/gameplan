import sortSchedule from "./sortSchedule";

test("A schedule should be sorted into an appropriate array", () => {
  const input = {
    FALL_0: ["Calc 1", "DTC 1", "EA 1", "CS 111"],
    SPRING_0: ["Calc 3", "DTC 2", "EA 3", "CS 214"],
    WINTER_0: ["Calc 2", "EA 2", "CS 211"],
    WINTER_1: ["CS 213"]
  };

  const output = [
    {
      quarter: "FALL",
      id: "FALL_0",
      classes: ["Calc 1", "DTC 1", "EA 1", "CS 111"]
    },
    {
      quarter: "WINTER",
      id: "WINTER_0",
      classes: ["Calc 2", "EA 2", "CS 211"]
    },
    {
      quarter: "SPRING",
      id: "SPRING_0",
      classes: ["Calc 3", "DTC 2", "EA 3", "CS 214"]
    },
    {
      quarter: "FALL",
      id: "FALL_1",
      classes: []
    },
    {
      quarter: "WINTER",
      id: "WINTER_1",
      classes: ["CS 213"]
    },
    {
      quarter: "SPRING",
      id: "SPRING_1",
      classes: []
    }
  ];

  expect(sortSchedule(input)).toEqual(output);
});
