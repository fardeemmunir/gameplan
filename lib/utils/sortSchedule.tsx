import { ScheduleInterface } from "../store";

interface SortedScheduleInterface {
  quarter: string;
  id: string;
  classes: string[];
}

function sortSchedule(schedule: ScheduleInterface) {
  const years: number[] = Array.from(
    new Set(Object.keys(schedule).map(str => Number(str.match(/\d/g)[0])))
  );
  const quarters = ["FALL", "WINTER", "SPRING"];
  const sortedSchedule: SortedScheduleInterface[] = [];

  years.forEach(year => {
    return quarters.forEach(quarter =>
      sortedSchedule.push({
        quarter,
        id: quarter + "_" + year,
        classes: schedule[quarter + "_" + year] || []
      })
    );
  });

  return sortedSchedule;
}

export default sortSchedule;
