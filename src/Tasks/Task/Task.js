import React, { useState } from "react";
import "./Task.css";

export default function ({ name, completed, setTasks, id }) {
  let [isCompleted, setIsCompleted] = useState(completed);

  const CheckHandler = () => {
    setTasks((prevTasks) => {
      prevTasks[id].completed = !prevTasks[id].completed;
      localStorage.setItem("tasks", JSON.stringify(prevTasks));
      return prevTasks;
    });
    setIsCompleted(!isCompleted);
    window.location.reload();
  };

  const deleteHandler = () => {
    setTasks((prevTasks) => {
      let newTasks = prevTasks.map((task) => {
        if (task.id == id) {
          console.log(prevTasks.findIndex((Task) => Task.id == task.id));
          prevTasks.splice(
            prevTasks.findIndex((Task) => Task.id == task.id),
            1
          );
        }
        return prevTasks;
      });
      console.log(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks[0]));
      return newTasks[0];
    });
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="task-header">
        {name}
        <div className="conditionary-countainer">
          <svg
            onClick={deleteHandler}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="#e74c3c"
              d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
            />
          </svg>
          {!isCompleted && (
            <svg
              className="checkbox"
              onClick={CheckHandler}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z"
              />
            </svg>
          )}
          {isCompleted && (
            <svg
              className="checkbox"
              onClick={CheckHandler}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="m9 11l3 3l8-8" />
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
