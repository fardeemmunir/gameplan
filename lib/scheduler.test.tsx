import scheduler from "./scheduler";

test("hello world", () => {
  const classList = [
    {
      code: "A",
      prereqs: [],
      quarterPref: "FALL"
    },
    {
      code: "B",
      prereqs: ["A"],
      quarterPref: "WINTER"
    },
    {
      code: "C",
      prereqs: ["C"],
      quarterPref: "FALL"
    }
  ];

  const output = {
    FALL_0: ["A"],
    WINTER_0: ["B"],
    SPRING_0: [],
    FALL_1: ["C"]
  };

  expect(scheduler(classList)).toBe(output);
});
