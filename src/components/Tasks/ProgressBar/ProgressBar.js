import { React, useEffect } from "react";
import "./progressBar.css";

export default function ProgressBar({ completedTasksLentgh, tasksLentgh }) {

  useEffect(() => {
    const bar = document.querySelector(".bar");
    if (completedTasksLentgh == 0) {
      bar.style.width = "0%";
    } else {
      let barPercent = (completedTasksLentgh / tasksLentgh) * 100;

      bar.style.width = ((completedTasksLentgh - 1) / tasksLentgh) * 100 + "%";
      
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
  }, [completedTasksLentgh]);
  return (
    <div className="progress-bar-countainer">
      <div className="progress-bar">
        <div className="bar"><p>{`${completedTasksLentgh}/${tasksLentgh}`}</p></div>
      </div>
    </div>
  );
}
