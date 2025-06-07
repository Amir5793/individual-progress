import React, { useState } from "react";
import "./Tasks.css";
import Task from "./Task/Task.js";

export default function Tasks({ tasks, setTasks }) {
  let [timePeriod, setTimePeriod] = useState("Daily");

  const timePeriodHandler = (e) => {
    const timePeriods = document.querySelectorAll(".time-period");

    timePeriods.forEach((timePeriod) => {
      timePeriod.classList.remove("active");
    });

    e.target.classList.add("active");
    setTimePeriod(e.target.innerHTML);
  };

  return (
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
          task.timePeriod == timePeriod && (
            <Task
              key={task.id}
              id={task.id}
              name={task.task}
              completed={task.completed}
              setTasks={setTasks}
            ></Task>
          )
      )}
      {tasks.map(
        (task) =>
          task.completed &&
          task.timePeriod == timePeriod && (
            <Task
              key={task.id}
              id={task.id}
              name={task.task}
              completed={task.completed}
              setTasks={setTasks}
            ></Task>
          )
      )}
    </div>
  );
}
