import scheduler from "./scheduler";

test("The scheduler works", () => {
  var classList = [
    {
      id: "Calc 1",
      prereqs: [],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "Calc 2",
      prereqs: ["Calc 1"],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "Calc 3",
      prereqs: ["Calc 2"],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "DTC 1",
      prereqs: [],
      quarterPref: ["FALL", "WINTER"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "DTC 2",
      prereqs: ["DTC 1"],
      quarterPref: ["SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "EA 1",
      prereqs: [],
      quarterPref: ["FALL"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "EA 2",
      prereqs: ["EA 1"],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "EA 3",
      prereqs: ["EA 2"],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "CS 111",
      prereqs: [],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "CS 211",
      prereqs: ["CS 111"],
      quarterPref: ["FALL", "WINTER", "SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "CS 214",
      prereqs: ["CS 211"],
      quarterPref: ["SPRING"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "CS 213",
      prereqs: ["CS 211"],
      quarterPref: ["WINTER"],
      interest: 1,
      difficulty: 0
    },
    {
      id: "EASY 1",
      prereqs: [],
      quarterPref: ["FALL"],
      interest: 5,
      difficulty: 0
    },
    {
      id: "EASY 2",
      prereqs: [],
      quarterPref: ["WINTER", "SPRING"],
      interest: 5,
      difficulty: 0
    }
  ];

  const output = {
    FALL_0: ["EASY 1", "Calc 1", "DTC 1", "EA 1"],
    SPRING_0: ["Calc 3", "DTC 2", "EA 3", "CS 211"],
    SPRING_1: ["CS 214"],
    WINTER_0: ["EASY 2", "Calc 2", "EA 2", "CS 111"],
    WINTER_1: ["CS 213"]
  };

  // @ts-ignore
  const result = scheduler(classList);

  expect(result).toStrictEqual(output);
});
