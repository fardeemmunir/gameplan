/***
 * classesAdded = []
 *
 * For every year and quarter
 * check to see classes that you can take
 * take the first 4
 * add them to classesAdded
 * Move on!
 *
 *
 */

interface ClassInfo {
  code: string;
  prereqs: string[];
  quarterPref: "WINTER" | "FALL" | "SPRING";
}

function scheduler(classList: ClassInfo[]) {
  let currentQuarter = "WINTER";
  const getNextQuarter = () => {
    switch (currentQuarter) {
      case "WINTER":
        return "SPRING";
      case "SPRING":
        return "FALL";
      case "FALL":
        return "WINTER";
    }
  };
}

export default scheduler;
