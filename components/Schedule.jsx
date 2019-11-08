import React from "react";
import difficultyToColor from "../lib/difficultyToColor";

const years = ["Freshman" /* , "Sophmore", "Junior", "Senior" */];
const quarters = ["Fall", "Winter", "Spring"];
const yearsAndQuarters = [];

years.forEach(year => {
  return quarters.forEach(quarter => yearsAndQuarters.push({ year, quarter }));
});

const classes = [
  { name: "EA 1", difficulty: 1, interest: 1, quarter: "FRESHMAN_FALL" },
  {
    name: "COMP_SCI 111",
    difficulty: 1,
    interest: 3,
    quarter: "FRESHMAN_FALL"
  },
  { name: "DTC 1", difficulty: 4, interest: 1, quarter: "FRESHMAN_FALL" },
  {
    name: "ES_APPM 252-1",
    difficulty: 3,
    interest: 5,
    quarter: "FRESHMAN_FALL"
  },

  {
    name: "COMP_SCI 211",
    difficulty: 3,
    interest: 3,
    quarter: "FRESHMAN_WINTER"
  },
  {
    name: "COMP_SCI 212",
    difficulty: 4,
    interest: 5,
    quarter: "FRESHMAN_WINTER"
  },
  {
    name: "ES_APPM 252-2",
    difficulty: 4,
    interest: 5,
    quarter: "FRESHMAN_WINTER"
  },
  { name: "EA 2", difficulty: 2, interest: 1, quarter: "FRESHMAN_WINTER" },

  { name: "EA 3", difficulty: 4, interest: 1, quarter: "FRESHMAN_SPRING" },
  {
    name: "COMP_SCI 214",
    difficulty: 4,
    interest: 5,
    quarter: "FRESHMAN_SPRING"
  },
  { name: "DTC 2", difficulty: 4, interest: 1, quarter: "FRESHMAN_SPRING" }
];

const Schedule = () => {
  return (
    <div className="w-full mb-10">
      <p className="text-center text-gigantic opacity-25 font-bold">Schedule</p>

      <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black">
        <div className="flex flex-wrap -mx-2">
          {yearsAndQuarters.map(({ year, quarter }, i) => (
            <div key={i} className="w-1/3 px-2 mb-4">
              <div className="border border-gray-200 rounded p-2 bg-white">
                <div className="flex justify-between">
                  <div>
                    <h1 className="text-sm uppercase font-bold tracking-widest">
                      {year}
                    </h1>
                    <h1 className="text-3xl leading-none mb-4">{quarter}</h1>
                  </div>

                  <div className="flex flex-col mb-8">
                    <div className="text-right mb-4">
                      <div className="px-2 py-2 font-bold text-white rounded bg-red-700 inline-block leading-none">
                        {classes
                          .filter(choice => {
                            const sT = `${year.toUpperCase()}_${quarter.toUpperCase()}`;
                            return choice.quarter === sT;
                          })
                          .reduce((a, b) => a + b.difficulty, 0)}
                      </div>
                      <p className="text-xs">Avg. Difficulty</p>
                    </div>

                    <div className="text-right">
                      <div className="px-2 py-2 font-bold text-white rounded bg-indigo-700 inline-block leading-none">
                        {classes
                          .filter(choice => {
                            const sT = `${year.toUpperCase()}_${quarter.toUpperCase()}`;
                            return choice.quarter === sT;
                          })
                          .reduce((a, b) => a + b.interest, 0)}
                      </div>
                      <p className="text-xs">Avg. Interest</p>
                    </div>
                  </div>
                </div>

                <ul>
                  {classes
                    .filter(choice => {
                      const sT = `${year.toUpperCase()}_${quarter.toUpperCase()}`;
                      return choice.quarter === sT;
                    })
                    .map(({ name, difficulty }) => (
                      <li
                        key={name}
                        className="text-white p-2 rounded mt-2"
                        style={{
                          backgroundColor: difficultyToColor(difficulty)
                        }}
                      >
                        {name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
