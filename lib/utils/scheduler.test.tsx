import scheduler from "./scheduler";

test("The scheduler works", () => {
  var classList = [
    {
      code: "Calc 1",
      prereqs: [],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "Calc 2",
      prereqs: ["Calc 1"],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "Calc 3",
      prereqs: ["Calc 2"],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "DTC 1",
      prereqs: [],
      quarterPref: ["FALL", "WINTER"]
    },
    {
      code: "DTC 2",
      prereqs: ["DTC 1"],
      quarterPref: ["SPRING"]
    },
    {
      code: "EA 1",
      prereqs: [],
      quarterPref: ["FALL"]
    },
    {
      code: "EA 2",
      prereqs: ["EA 1"],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "EA 3",
      prereqs: ["EA 2"],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "CS 111",
      prereqs: [],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "CS 211",
      prereqs: [],
      quarterPref: ["FALL", "WINTER", "SPRING"]
    },
    {
      code: "CS 214",
      prereqs: ["CS 211"],
      quarterPref: ["SPRING"]
    },
    {
      code: "CS 213",
      prereqs: ["CS 211"],
      quarterPref: ["WINTER"]
    }
  ];

  const output = {
    FALL_0: ["Calc 1", "DTC 1", "EA 1", "CS 111"],
    SPRING_0: ["Calc 3", "DTC 2", "EA 3", "CS 214"],
    WINTER_0: ["Calc 2", "EA 2", "CS 211"],
    WINTER_1: ["CS 213"]
  };

  expect(scheduler(classList)).toStrictEqual(output);
});
