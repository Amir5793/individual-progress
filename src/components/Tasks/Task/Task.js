import React, { useState } from "react";
import "./Task.css";

export default function Task({ name, completed, setTasks, id, dateCreated, color }) {
  let [isCompleted, setIsCompleted] = useState(completed);

  const CheckHandler = () => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
    setIsCompleted(!isCompleted);
  };
  const deleteHandler = () => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  return (
    <div className={`container ${color}`}>
      {!isCompleted && <div className="task-header">{name}</div>}
      {isCompleted && <div className="task-header completed">{name}</div>}
      <div className="date">{dateCreated}</div>
      <div className="conditional-container">
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
  );
}
