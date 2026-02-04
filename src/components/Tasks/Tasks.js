import React, { useState, useEffect } from "react";
import "./Tasks.css";
import Task from "./Task/Task.js";
import AddTaskModal from "./AddTaskModal/AddTaskModal.js";
import ProgressBar from "./ProgressBar/ProgressBar.js";

export default function Tasks() {
  let [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const nowDate = new Date();
  tasks.forEach((task) => {
    // console.log(!(task.dateHandler == nowDate.getDay() - task.daysPassed))
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
      task.monthspassed++;
    }
  });

  let [timePeriod, setTimePeriod] = useState("Daily");
  let [showModal, setShowModal] = useState(false);
  let [btn] = useState(false);

  let completedTasksLentgh = 0;
  tasks.forEach((task) => {
    task.completed && task.timePeriod === timePeriod && completedTasksLentgh++;
  });
  let tasksLentgh = 0;
  tasks.forEach((task) => {
    task.timePeriod === timePeriod && tasksLentgh++;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const timePeriodHandler = (e) => {
    const timePeriods = document.querySelectorAll(".time-period");

    timePeriods.forEach((timePeriod) => {
      timePeriod.classList.remove("active");
    });

    e.target.classList.add("active");
    setTimePeriod(e.target.innerHTML);
  };

  const clearAllHandler = () => {
    localStorage.setItem("tasks", JSON.stringify([]));
    setTasks([]);
  };

  console.log(nowDate.getDate());
  console.log(tasks);
  return (
    <div className="main-countainer">
      {!showModal && (
        <div>
          <div className="countainer">
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
            {tasks.map(
              (task) =>
                !task.completed &&
                task.timePeriod === timePeriod && (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.task}
                    color={task.color}
                    completed={task.completed}
                    dateCreated={task.dateCreated}
                    setTasks={setTasks}
                  ></Task>
                )
            )}
            <br className="devider" />
            {tasks.map(
              (task) =>
                task.completed &&
                task.timePeriod === timePeriod && (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.task}
                    color={task.color}
                    completed={task.completed}
                    dateCreated={task.dateCreated}
                    setTasks={setTasks}
                  ></Task>
                )
            )}
          </div>
          <ProgressBar
            completedTasksLentgh={completedTasksLentgh}
            tasksLentgh={tasksLentgh}
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
          {!btn && (
            <div
              className="addBtn"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <AddTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          setTasks={setTasks}
        ></AddTaskModal>
      )}
    </div>
  );
}
