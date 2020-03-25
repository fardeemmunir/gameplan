export default () => <h1>Helo</h1>;

// import React, { useContext } from "react";
// import { DragDropContext } from "react-beautiful-dnd";

// import QuarterCard from "./QuarterCard";
// import Store from "../lib/store";
// import scheduleBuilder from "../lib/utils/scheduler";
// import sortSchedule from "../lib/utils/sortSchedule";
// import { useState } from "react";
// import { CSSTransition } from "react-transition-group";

// const Schedule = () => {
//   const [classBeingDragged, setClassBeingDragged] = useState(null);
//   const { classList, schedule, dispatch } = useContext(Store);
//   const sortedSchedule = sortSchedule(schedule.data);

//   function updateSchedule(result) {
//     setClassBeingDragged(null);
//     const { destination, source, draggableId } = result;
//     const updatedSchedule = Object.assign({}, schedule);

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     )
//       return;

//     // Remove item from source
//     const newSource = Array.from(schedule[source.droppableId] || []);
//     newSource.splice(source.index, 1);

//     // Add item to destination
//     const newDest = Array.from(schedule[destination.droppableId] || []);

//     // If user is reordering items in the same column
//     if (destination.droppableId === source.droppableId) {
//       newSource.splice(destination.index, 0, draggableId);
//       updatedSchedule[source.droppableId] = newSource;
//     } else {
//       newDest.splice(destination.index, 0, draggableId);
//       updatedSchedule[source.droppableId] = newSource;
//       updatedSchedule[destination.droppableId] = newDest;
//     }

//     // console.log(updatedSchedule);
//     dispatch({
//       type: "UPDATE_SCHEDULE",
//       payload: {
//         updatedSchedule
//       }
//     });
//   }

//   function generateSchedule() {
//     dispatch({
//       type: "UPDATE_SCHEDULE",
//       payload: {
//         updatedSchedule: scheduleBuilder(classList)
//       }
//     });
//   }

//   function clearSchedule() {
//     dispatch({
//       type: "UPDATE_SCHEDULE",
//       payload: {
//         updatedSchedule: {}
//       }
//     });
//   }

//   function saveDraggedClass(payload) {
//     setClassBeingDragged(payload.draggableId);
//   }

//   function isDropDisabled(quarter, currentQuarterIndex) {
//     if (!classBeingDragged) return false;

//     const classInfo = classList.find(({ code }) => code === classBeingDragged);

//     const classesCompletedTillNow = sortedSchedule
//       .slice(0, currentQuarterIndex)
//       .map(({ classes }) => classes)
//       .flat();

//     // Flip the boolean since the function is asking if the drop is disabled or not
//     // Condtitions for being enabled
//     // 1. Quarter in quarter pref
//     // 2. classCompletedTillNow includes all prereqs
//     // 3. All classes in ClassCompletedTillNow doesnt have a prereq that includes the classBeing dragged
//     return !(
//       classInfo.quarterPref.includes(quarter) &&
//       classInfo.prereqs.every(code => classesCompletedTillNow.includes(code)) &&
//       classesCompletedTillNow.every(code => {
//         const classInfo = classList.find(info => info.code === code);

//         return !classInfo.prereqs.includes(classBeingDragged);
//       })
//     );
//   }

//   return (
//     <div className="w-full mb-10">
//       <p className="text-center text-gigantic opacity-25 font-bold">Schedule</p>

//       <div className="p-4 w-full max-w-3xl mx-auto -mt-16 rounded text-black relative z-10 schedule-chart mb-12">
//         {Object.keys(schedule).length === 0 ? (
//           <div className="w-full flex flex-wrap justify-center">
//             <button className="form__submit" onClick={generateSchedule}>
//               Generate
//             </button>
//           </div>
//         ) : (
//           <CSSTransition
//             in={Object.keys(schedule).length !== 0}
//             timeout={1000}
//             unmountOnExit
//             classNames="fade-in-card"
//           >
//             <div>
//               <DragDropContext
//                 onDragStart={saveDraggedClass}
//                 onDragEnd={updateSchedule}
//               >
//                 <div className="flex flex-wrap -mx-2">
//                   {sortedSchedule.map(({ quarter, classes, id }, i) => (
//                     <QuarterCard
//                       key={i}
//                       id={id}
//                       quarter={quarter}
//                       isDropDisabled={isDropDisabled(quarter, i)}
//                       classes={classes.map(code =>
//                         classList.find(info => info.code === code)
//                       )}
//                     />
//                   ))}
//                 </div>
//               </DragDropContext>
//               <div className="w-full flex justify-center">
//                 <button
//                   className="form__submit mr-4"
//                   onClick={generateSchedule}
//                 >
//                   Reset Schedule
//                 </button>
//                 <button className="form__submit" onClick={clearSchedule}>
//                   Clear Schedule
//                 </button>
//               </div>
//             </div>
//           </CSSTransition>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Schedule;