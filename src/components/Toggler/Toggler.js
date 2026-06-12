import React from "react";
import "./Toggler.css";

export default function Toggler({ setToggle }) {
  const toggleAbleHandler = (e) => {
    const timePeriods = document.querySelectorAll(".toggle-able");

    timePeriods.forEach((timePeriod) => {
      timePeriod.classList.remove("active-toggle");
    });

    e.target.classList.add("active-toggle");
    setToggle(e.target.textContent);
  };

  return (
    <div className="toggles-container">
      <div className="toggles-able">
        <h3 className="toggle-able tasks-toggle-able active-toggle" onClick={toggleAbleHandler}>
          Tasks
        </h3>
        <h3 className="toggle-able habits-toggle-able" onClick={toggleAbleHandler}>
          Habits
        </h3>
      </div>
    </div>
  );
}
