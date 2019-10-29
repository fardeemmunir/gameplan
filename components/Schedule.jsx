import React from "react";

const Schedule = () => {
  return (
    <div className="w-full mb-10">
      <p className="text-center text-3xl font-bold">Schedule</p>
      <div className="w-full rounded bg-white p-2 flex flex-wrap">
        {[1, 2, 3, 4, 5, 6].map(() => (
          <div className="w-1/3 border border-gray-500 h-12 mr-3"></div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
