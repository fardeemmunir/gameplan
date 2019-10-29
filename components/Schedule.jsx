import React from "react";

const years = ["Freshman", "Sophmore", "Junior", "Senior"];
const quarters = ["Fall", "Winter", "Spring"];
const yearsAndQuarters = [];

years.forEach(year => {
  return quarters.forEach(quarter => yearsAndQuarters.push({ year, quarter }));
});

const Schedule = () => {
  return (
    <div className="w-full mb-10">
      <p className="text-center text-3xl font-bold">Schedule</p>

      <div className="p-4 w-full rounded bg-white text-black">
        <div className="flex flex-wrap -mx-2">
          {yearsAndQuarters.map(({ year, quarter }, i) => (
            <div key={i} className="w-1/3 px-2 mb-2">
              <div className="border border-gray-200 rounded h-64 p-2">
                <h1 className="text-sm uppercase font-bold tracking-widest">
                  {year}
                </h1>
                <h1 className="text-3xl leading-none">{quarter}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
