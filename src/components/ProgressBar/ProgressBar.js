import { React, useEffect } from "react";
import "./ProgressBar.css";

export default function ProgressBar({ completedValuesLength, valuesLength }) {

  useEffect(() => {
    const bar = document.querySelector(".bar");
    if (completedValuesLength === 0) {
      bar.style.width = "0%";
    } else {
      let barPercent = (completedValuesLength / valuesLength) * 100;

      bar.style.width = ((completedValuesLength - 1) / valuesLength) * 100 + "%";

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
  }, [completedValuesLength, valuesLength]);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="bar"><p>{`${completedValuesLength}/${valuesLength}`}</p></div>
      </div>
    </div>
  );
}
