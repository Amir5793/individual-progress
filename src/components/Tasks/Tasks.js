import React, { useState, useEffect } from "react";
import "./Tasks.css";
import Task from "./Task/Task.js";
import AddModal from "../AddModal/AddModal.js";
import ProgressBar from "../ProgressBar/ProgressBar.js";

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

export default function Tasks({ showModal, setShowModal, tasks: parentTasks, setTasks: setParentTasks }) {
  const [tasks, setTasks] = useState(() => {
    const stored = safeParseJSON("tasks", null);
    return Array.isArray(stored) ? stored : [];
  });

  // Use parent state if provided, otherwise use local state
  const displayTasks = parentTasks && parentTasks.length > 0 ? parentTasks : tasks;
  
  // Sync local state when parent state changes
  useEffect(() => {
    if (parentTasks && parentTasks.length > 0) {
      setTasks(parentTasks);
    }
  }, [parentTasks]);

  const nowDate = new Date();
  const displayTasksCopy = displayTasks.map(t => ({...t}));
  displayTasksCopy.forEach((task) => {
    if (
      (task.dateHandler < nowDate.getDay() ||
        task.dateHandler > nowDate.getDay()) &&
      task.timePeriod === "Daily"
    ) {
      task.completed = false;
      task.daysPassed = nowDate.getDay() - task.dateHandler;
      task.dateHandler = nowDate.getDay();
    }
    if (
      task.daysPassed / task.weeksPassed / 7 === 1 &&
      task.timePeriod === "Weekly"
    ) {
      task.completed = false;
      task.weeksPassed++;
    }
    if (
      task.daysPassed / task.monthsPassed / 30 === 1 &&
      task.timePeriod === "Monthly"
    ) {
      task.completed = false;
      task.monthsPassed++;
    }
  });

  let [timePeriod, setTimePeriod] = useState("Daily");

  let completedTasksLength = 0;
  displayTasksCopy.forEach((task) => {
    task.completed && task.timePeriod === timePeriod && completedTasksLength++;
  });
  let tasksLength = 0;
  displayTasksCopy.forEach((task) => {
    task.timePeriod === timePeriod && tasksLength++;
  });

  const timePeriodHandler = (e) => {
    const timePeriods = document.querySelectorAll(".time-period");

    timePeriods.forEach((timePeriod) => {
      timePeriod.classList.remove("active");
    });

    e.target.classList.add("active");
    setTimePeriod(e.target.innerHTML);
  };

  const clearAllHandler = () => {
    if (setParentTasks) {
      setParentTasks([]);
    } else {
      safeSetItem("tasks", []);
      setTasks([]);
    }
  };

  return (
    <div className="main-container">
      {!showModal && (
        <div>
          <div className="time-periods-container">
            <div className="time-periods">
              <h3 className="time-period active" onClick={timePeriodHandler}>
                Daily
              </h3>
              <h3 className="time-period" onClick={timePeriodHandler}>
                Weekly
              </h3>
              <h3 className="time-period" onClick={timePeriodHandler}>
                Monthly
              </h3>
            </div>
            {displayTasksCopy.map(
              (task) =>
                !task.completed &&
                task.timePeriod === timePeriod && (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.value}
                    color={task.color}
                    completed={task.completed}
                    dateCreated={task.dateCreated}
                    setTasks={setParentTasks || setTasks}
                  ></Task>
                )
            )}
            <br className="divider" />
            {displayTasksCopy.map(
              (task) =>
                task.completed &&
                task.timePeriod === timePeriod && (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.value}
                    color={task.color}
                    completed={task.completed}
                    dateCreated={task.dateCreated}
                    setTasks={setParentTasks || setTasks}
                  ></Task>
                )
            )}
          </div>
          <ProgressBar
            completedValuesLength={completedTasksLength}
            valuesLength={tasksLength}
          ></ProgressBar>
          <div
            className="clear-all"
            onClick={() => {
              clearAllHandler();
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
{/* 
      {showModal === "task" && (
        <AddModal
          showModal={showModal}
          setShowModal={setShowModal}
          setTasks={setTasks}
          isTaskModal={true}
          // isTargetModal={false}
        ></AddModal>
      )} */}
    </div>
  );
}