import { Schedule, Class } from "../reducer";

enum QuarterOptions {
  Fall = "FALL",
  Winter = "WINTER",
  Spring = "SPRING"
}

function scheduler(classList: Class[], locks: Schedule = {}) {
  let currentQuarter: QuarterOptions = QuarterOptions.Fall;

  const schedule: Schedule = {};
  let allocatedClasses: string[] = [];
  let year: number = 0;
  let selectedClasses: string[] = [];

  while (allocatedClasses.length !== classList.length) {
    const quarterToAllocate = `${currentQuarter}_${year}`;

    if (locks[quarterToAllocate]) {
      selectedClasses = locks[quarterToAllocate];
    } else {
      selectedClasses = classList
        .filter(classInfo => !allocatedClasses.includes(classInfo.id))
        .filter(classInfo => {
          return (
            classInfo.quarterPref.includes(currentQuarter) &&
            classInfo.prereqs.every(id => allocatedClasses.includes(id))
          );
        })
        .sort((a, b) => {
          return a.code < b.code ? 1 : -1;
        })
        .sort((a, b) => {
          const aScore = a.interest - a.difficulty;
          const bscore = b.interest - b.difficulty;

          return aScore <= bscore ? 1 : -1;
        })
        .map(({ id }) => id);

      if (selectedClasses.length > 4) {
        selectedClasses = selectedClasses.slice(0, 4);
      }
    }

    if (selectedClasses.length > 0) {
      schedule[quarterToAllocate] = selectedClasses;
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
