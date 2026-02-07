import {React, useState, useEffect} from 'react'
import "./Targets.css"
import Target from './Target/Target';
import AddTargetModal from './AddTargetModal/AddTargetModal';
import TargetsProgressBar from './TargetsProgressBar/TargetsProgressBar';

export default function Targets({showTargetsModal, setShowTargetsModal}) {
    let [targets, setTargets] = useState(
        JSON.parse(localStorage.getItem("targets"))
          ? JSON.parse(localStorage.getItem("targets"))
          : []
          
      );

      const nowDate = new Date();
      targets.forEach((target) => {
        if (
          (target.dateHandler < nowDate.getDay() ||
            target.dateHandler > nowDate.getDay()) &&
          target.timePeriod === "Daily"
        ) {
          target.completed = false;
          target.daysPassed = nowDate.getDay() - target.dateHandler;
          target.dateHandler = nowDate.getDay();
        }
        if (
          target.daysPassed / target.weeksPassed / 7 === 1 &&
          target.timePeriod === "Weekly"
        ) {
          target.completed = false;
          target.weeksPassed++;
        }
        if (
          target.daysPassed / target.monthsPassed / 30 === 1 &&
          target.timePeriod === "Monthly"
        ) {
          target.completed = false;
          target.monthsPassed++;
        }
      });

      let [targetTimePeriod, setTargetTimePeriod] = useState("Daily");
    
      let completedTargetsLength = 0;
      targets.forEach((Target) => {
        Target.completed && Target.timePeriod === targetTimePeriod && completedTargetsLength++;
      });
      let targetsLength = 0;
      targets.forEach((Target) => {
        Target.timePeriod === targetTimePeriod && targetsLength++;
      });

      useEffect(() => {
        localStorage.setItem("targets", JSON.stringify(targets));
      }, [targets]);

      const TargetsTimePeriodHandler = (e) => {
        const timePeriods = document.querySelectorAll(".targets-time-period");
    
        timePeriods.forEach((timePeriod) => {
          timePeriod.classList.remove("active-target");
        });
    
        e.target.classList.add("active-target");
        setTargetTimePeriod(e.target.innerHTML);
      };

      const clearAllTargetsHandler = () => {
        localStorage.setItem("targets", JSON.stringify([]));
        setTargets([]);
      };

    return (
        <div className="main-container">
        {!showTargetsModal && (
          <div>
            <div className="targets-time-periods-container">
              <div className="targets-time-periods">
                <h3 className="targets-time-period active-target" onClick={TargetsTimePeriodHandler}>
                  Daily
                </h3>
                <h3 className="targets-time-period" onClick={TargetsTimePeriodHandler}>
                  Weekly
                </h3>
                <h3 className="targets-time-period" onClick={TargetsTimePeriodHandler}>
                  Monthly
                </h3>
              </div>
              {targets.map(
                (target) =>
                  !target.completed &&
                  target.timePeriod === targetTimePeriod && (
                    <Target                      key={target.id}
                      id={target.id}
                      name={target.target}
                      color={target.color}
                      completed={target.completed}
                      dateCreated={target.dateCreated}
                      setTargets={setTargets}
                    ></Target>
                  )
              )}
              <br className="divider" />
              {targets.map(
                (target) =>
                  target.completed &&
                  target.timePeriod === targetTimePeriod && (
                    <Target                      key={target.id}
                      id={target.id}
                      name={target.target}
                      color={target.color}
                      completed={target.completed}
                      dateCreated={target.dateCreated}
                      setTargets={setTargets}
                    ></Target>
                  )
              )}
            </div>
            <TargetsProgressBar
              completedTargetsLength={completedTargetsLength}
              targetsLength={targetsLength}
            ></TargetsProgressBar>
            <div
              className="clear-all"
              onClick={() => {
                clearAllTargetsHandler();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="#e74c3c"
                  d="M16 16h2c.55 0 1 .45 1 1s-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1m0-8h5c.55 0 1 .45 1 1s-.45 1-1 1h-5c-.55 0-1-.45-1-1s.45-1 1-1m0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1M3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3zM13 5h-2l-.71-.71c-.18-.18-.44-.29-.7-.29H6.41c-.26 0-.52.11-.7.29L5 5H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1"
                />
              </svg>
            </div>
          </div>
        )}
  
        {showTargetsModal && (
          <AddTargetModal
            showTargetsModal={showTargetsModal}
            setShowTargetsModal={setShowTargetsModal}
            setTargets={setTargets}
          ></AddTargetModal>
        )}
      </div>
    )
}
