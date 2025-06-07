import React from "react";
import "./AddTaskModal.css";

export default function AddTaskModal({ showModal, setShowModal, setTasks }) {
  const addTask = () => {
    const input = document.querySelector("input");
    const task = input.value;
    // const timeRaidios = document.querySelectorAll('.radio')
    if (task) {
      if (document.querySelector(".checked")) {
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            id: prevTasks.length,
            task: task,
            completed: false,
            timePeriod:
              document.querySelector(".checked").previousElementSibling
                .innerHTML,
          },
        ]);
        setShowModal(!showModal);
      }
    }
  };

  const timeCheckHandler = (e) => {
    let timeRadios = document.querySelectorAll(".radio");
    timeRadios.forEach((radio) => {
      radio.classList.remove("checked");
    });
    e.target.classList.add("checked");
  };

  return (
    <div className="modal-countainer">
      <div className="header">
        <h1>Enter the task title and time</h1>
      </div>
      <div className="body">
        <input type="text" />
        <div className="radio-countainer">
          <div className="dailyTimePeriod">
            <label htmlFor="dailyTimePeriod">Daily</label>
            <input
              type="radio"
              name="time-period"
              id="dailyTimePeriod"
              className="radio"
              onChange={timeCheckHandler}
            />
          </div>
          <div className="weeklyTimePeriod">
            <label htmlFor="weeklyTimePeriod">Weekly</label>
            <input
              type="radio"
              name="time-period"
              id="weeklyTimePeriod"
              className="radio"
              onChange={timeCheckHandler}
            />
          </div>
          <div className="monthlyTimePeriod">
            <label htmlFor="monthlyTimePeriod">Monthly</label>
            <input
              type="radio"
              name="time-period"
              id="monthlyTimePeriod"
              className="radio"
              onChange={timeCheckHandler}
            />
          </div>
        </div>
      </div>
      <div className="btn">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={addTask}
          >
            <path
              fill="currentColor"
              d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
