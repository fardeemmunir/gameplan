import React from "react";
import difficultyToColor from "../lib/difficultyToColor";
import QuarterCard from "./QuarterCard";

const years = ["Freshman" /* , "Sophmore", "Junior", "Senior" */];
const quarters = ["Fall", "Winter", "Spring"];
const yearsAndQuarters = [];

years.forEach(year => {
  return quarters.forEach(quarter => yearsAndQuarters.push({ year, quarter }));
});

const classes = [
  {
    code: "ES_APPM 252-1",
    name: "Multivariable Differential Calculus",
    quarterPref: ["FALL"],
    difficulty: 3,
    prereqs: [],
    index: 0,
    interest: 1,
    schedule: "FRESHMAN_FALL"
  },
  {
    code: "COMP_SCI 111",
    name: "Intro to Programming",
    prereqs: [],
    difficulty: 1,
    quarterPref: ["FALL"],
    index: 1,
    interest: 1,
    schedule: "FRESHMAN_FALL"
  },
  {
    code: "GEN_ENG 205-1",
    name: "Engineering Analysis 1",
    prereqs: [],
    difficulty: 1,
    quarterPref: ["FALL"],
    index: 2,
    interest: 1,
    schedule: "FRESHMAN_FALL"
  },
  {
    code: "GEN_ENG 205-2",
    name: "Engineering Analysis 2",
    prereqs: ["GEN_ENG 205-1"],
    difficulty: 1,
    quarterPref: ["WINTER"],
    index: 3,
    interest: 1,
    schedule: "FRESHMAN_WINTER"
  },
  {
    code: "GEN_ENG 205-3",
    name: "Engineering Analysis 3",
    prereqs: ["GEN_ENG 205-2"],
    difficulty: 2,
    quarterPref: ["SPRING"],
    index: 4,
    interest: 1,
    schedule: "FRESHMAN_SPRING"
  },
  {
    code: "COMP_SCI 212",
    name: "Mathematical Foundations of Comp Science",
    prereqs: ["COMP_SCI 111"],
    difficulty: 4,
    quarterPref: ["FALL", "WINTER", "SPRING"],
    index: 5,
    interest: 1,
    schedule: "FRESHMAN_WINTER"
  },
  {
    code: "DSGN 106-1",
    name: "DTC 1",
    prereqs: [],
    difficulty: 2,
    quarterPref: ["FALL"],
    index: 6,
    interest: 1,
    schedule: "FRESHMAN_FALL"
  },
  {
    code: "DSGN 106-2",
    name: "DTC 2",
    prereqs: ["DSGN 106-1"],
    difficulty: 2,
    quarterPref: ["SPRING"],
    index: 7,
    interest: 1,
    schedule: "FRESHMAN_SPRING"
  }
];

const Schedule = () => {
  return (
    <div className="w-full mb-10">
      <p className="text-center text-gigantic opacity-25 font-bold">Schedule</p>

      <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black">
        <div className="flex flex-wrap -mx-2">
          {yearsAndQuarters.map(({ year, quarter }, i) => (
            <QuarterCard
              year={year}
              quarter={quarter}
              classes={classes.filter(
                classInfo =>
                  classInfo.schedule ===
                  year.toUpperCase() + "_" + quarter.toUpperCase()
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
