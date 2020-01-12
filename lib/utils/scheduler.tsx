import { ScheduleInterface, ClassInfoInterface } from "../store";

enum QuarterOptions {
  Fall = "FALL",
  Winter = "WINTER",
  Spring = "SPRING"
}

function scheduler(classList: Partial<ClassInfoInterface>[]) {
  let currentQuarter: QuarterOptions = QuarterOptions.Fall;

  const schedule: ScheduleInterface = {};
  let allocatedClasses: string[] = [];
  let year: number = 0;
  let selectedClasses: string[] = [];

  while (allocatedClasses.length !== classList.length) {
    selectedClasses = classList
      .filter(classInfo => !allocatedClasses.includes(classInfo.code))
      .filter(classInfo => {
        return (
          classInfo.quarterPref.includes(currentQuarter) &&
          classInfo.prereqs.every(code => allocatedClasses.includes(code))
        );
      })
      .sort((a, b) => {
        const aScore = a.interest - a.difficulty;
        const bscore = b.interest - b.difficulty;

        return aScore <= bscore ? 1 : -1;
      })
      .map(({ code }) => code);

    if (selectedClasses.length > 4) {
      selectedClasses = selectedClasses.slice(0, 4);
    }

    if (selectedClasses.length > 0) {
      schedule[currentQuarter + "_" + year] = selectedClasses;
    }

    allocatedClasses = allocatedClasses.concat(selectedClasses);

    if (currentQuarter === QuarterOptions.Spring) year++;

    switch (currentQuarter) {
      case QuarterOptions.Winter:
        currentQuarter = QuarterOptions.Spring;
        break;
      case QuarterOptions.Spring:
        currentQuarter = QuarterOptions.Fall;
        break;
      case QuarterOptions.Fall:
        currentQuarter = QuarterOptions.Winter;
        break;
    }
  }

  return schedule;
}

export default scheduler;
