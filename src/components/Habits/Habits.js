import { React, useState, useEffect } from "react";
import "./Habits.css";
import Habit from "./Habit/Habit";
import AddModal from "../AddModal/AddModal";
import ProgressBar from "../ProgressBar/ProgressBar";

function safeParseJSON(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    const parsed = JSON.parse(item);
    return parsed ?? fallback;
  } catch (e) {
    console.error(`Failed to parse localStorage key "${key}":`, e);
    return fallback;
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write to localStorage key "${key}":`, e);
  }
}

export default function Habits({ showModal, setShowModal, habits: parentHabits, setHabits: setParentHabits }) {
  const [habits, setHabits] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("habits"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  // Use parent state if provided, otherwise use local state
  const displayHabits = parentHabits && parentHabits.length > 0 ? parentHabits : habits;
  
  // Sync local state when parent state changes
  useEffect(() => {
    if (parentHabits && parentHabits.length > 0) {
      setHabits(parentHabits);
    }
  }, [parentHabits]);

  const nowDate = new Date();
  const displayHabitsCopy = displayHabits.map(h => ({...h}));
  displayHabitsCopy.forEach((habit) => {
    if (
      (habit.dateHandler < nowDate.getDay() ||
        habit.dateHandler > nowDate.getDay()) &&
      habit.timePeriod === "Daily"
    ) {
      habit.completed = false;
      habit.daysPassed = nowDate.getDay() - habit.dateHandler;
      habit.dateHandler = nowDate.getDay();
    }
    if (
      habit.daysPassed / habit.weeksPassed / 7 === 1 &&
      habit.timePeriod === "Weekly"
    ) {
      habit.completed = false;
      habit.weeksPassed++;
    }
    if (
      habit.daysPassed / habit.monthsPassed / 30 === 1 &&
      habit.timePeriod === "Monthly"
    ) {
      habit.completed = false;
      habit.monthsPassed++;
    }
  });
  let [habitTimePeriod, setHabitTimePeriod] = useState("Daily");

  let completedHabitsLength = 0;
  displayHabitsCopy.forEach((Habit) => {
    Habit.completed &&
      Habit.timePeriod === habitTimePeriod &&
      completedHabitsLength++;
  });
  let habitsLength = 0;
  displayHabitsCopy.forEach((Habit) => {
    Habit.timePeriod === habitTimePeriod && habitsLength++;
  });

  const HabitsTimePeriodHandler = (e) => {
    const timePeriods = document.querySelectorAll(".habits-time-period");

    timePeriods.forEach((timePeriod) => {
      timePeriod.classList.remove("active-habit");
    });

    e.target.classList.add("active-habit");
    setHabitTimePeriod(e.target.textContent);
  };

  const clearAllHabitsHandler = () => {
    if (setParentHabits) {
      setParentHabits([]);
    } else {
      safeSetItem("habits", []);
      setHabits([]);
    }
  };


  return (
    <div className="main-container">
      {!showModal && (
        <div>
          <div className="habits-time-periods-container">
            <div className="habits-time-periods">
              <h3
                className="habits-time-period active-habit"
                onClick={HabitsTimePeriodHandler}
              >
                Daily
              </h3>
              <h3
                className="habits-time-period"
                onClick={HabitsTimePeriodHandler}
              >
                Weekly
              </h3>
              <h3
                className="habits-time-period"
                onClick={HabitsTimePeriodHandler}
              >
                Monthly
              </h3>
            </div>
            
            {displayHabitsCopy.map(
              (habit) =>
                !habit.completed &&
                habit.timePeriod === habitTimePeriod && (
                  <Habit
                    key={habit.id}
                    id={habit.id}
                    name={habit.value}
                    color={habit.color}
                    completed={habit.completed}
                    dateCreated={habit.dateCreated}
                    setHabits={setParentHabits || setHabits}
                  ></Habit>
                ),
            )}
            <br className="divider" />
            {displayHabitsCopy.map(
              (habit) =>
                habit.completed &&
                habit.timePeriod === habitTimePeriod && (
                  <Habit
                    key={habit.id}
                    id={habit.id}
                    name={habit.value}
                    color={habit.color}
                    completed={habit.completed}
                    dateCreated={habit.dateCreated}
                    setHabits={setParentHabits || setHabits}
                  ></Habit>
                ),
            )}
          </div>
          <ProgressBar
            completedValuesLength={completedHabitsLength}
            valuesLength={habitsLength}
          ></ProgressBar>
          <div
            className="clear-all"
            onClick={() => {
              clearAllHabitsHandler();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#e74c3c"
                d="M16 16h2c.55 0 1 .45 1 1s-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1m0-8h5c.55 0 1 .45 1 1s-.45 1-1 1h-5c-.55 0-1-.45-1-1s.45-1 1-1m0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1M3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3zM13 5h-2l-.71-.71c-.18-.18-.44-.29-.7-.29H6.41c-.26 0-.52.11-.7.29L5 5H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1"
              />
            </svg>
          </div>
        </div>
      )}

      {/* {showModal === "habit" && (
        <AddModal
          ishabitsModal={true}
          // isTaskModal={false}
          showModal={showModal}
          setShowModal={setShowModal}
          sethabits={sethabits}
        ></AddModal>
      )} */}
    </div>
  );
}