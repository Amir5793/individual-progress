import { React, useEffect } from "react";
import "./progressBar.css";

export default function ProgressBar({ completedTasksLength, tasksLength }) {

  useEffect(() => {
    const bar = document.querySelector(".bar");
    if (completedTasksLength === 0) {
      bar.style.width = "0%";
    } else {
      let barPercent = (completedTasksLength / tasksLength) * 100;

      bar.style.width = ((completedTasksLength - 1) / tasksLength) * 100 + "%";
      
      setTimeout(() => {
        bar.style.width = barPercent + "%";
      }, 10);

      if (barPercent <= 25) {
        bar.style.backgroundColor = "#e74c3c";
      } else if (barPercent <= 50 && barPercent > 25) {
        bar.style.backgroundColor = "#e67e22";
      } else if (barPercent <= 75 && barPercent > 50) {
        bar.style.backgroundColor = "#f1c40f";
      } else {
        bar.style.backgroundColor = "#2ecc71";
      }
    }
  }, [completedTasksLength, tasksLength]);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="bar"></div>
      </div>
    </div>
  );
}
