import { React, useEffect } from "react";
import "./TargetsProgressBar.css";

export default function TargetsProgressBar({ completedTargetsLength, targetsLength }) {
  useEffect(() => {
    const bar = document.querySelector(".bar");
    if (completedTargetsLength === 0) {
      bar.style.width = "0%";
    } else {
      let barPercent = (completedTargetsLength / targetsLength) * 100;

      bar.style.width = ((completedTargetsLength - 1) / targetsLength) * 100 + "%";
      
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
  }, [completedTargetsLength, targetsLength]);
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="bar"><p>{`${completedTargetsLength}/${targetsLength}`}</p></div>
      </div>
    </div>
  );
}
