import React from 'react'
import "./Toggler.css"

export default function Toggler({ setToggle }) {

    const toggleAbleHandler = (e) => {
        const timePeriods = document.querySelectorAll(".toggle-able");

        timePeriods.forEach((timePeriod) => {
            timePeriod.classList.remove("active-toggle");
        });

        e.target.classList.add("active-toggle");
        setToggle(e.target.innerHTML);
    };

    return (
        <div className="toggle-ables">
            <h3 className="toggle-able active-toggle" onClick={toggleAbleHandler}>
                Tasks
            </h3>
            <h3 className="toggle-able" onClick={toggleAbleHandler}>
                Targets
            </h3>
        </div>
    )
}
