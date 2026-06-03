import React, { useRef, useState, useEffect } from "react";
import "./AddModal.css";

export default function AddModal({
  isHabitModal,
  isTaskModal,
  showModal,
  setShowModal,
  habits,
  setHabits,
  tasks,
  setTasks,
}) {
  const [error, setError] = useState(null);
  const [habitAddOns, setHabitAddOns] = useState(false);
  const [selectedColor, setSelectedColor] = useState("blue");
  const input = useRef(null);
  const showModalRef = useRef(showModal);

  // Keep ref in sync with showModal prop
  useEffect(() => {
    showModalRef.current = showModal;
  }, [showModal]);

  // Reset error when modal opens/closes
  useEffect(() => {
    if (showModal) {
      setError(null);
      if (input.current) {
        input.current.value = "";
      }
    }
  }, [showModal]);

  const Add = () => {
    // Adds a task or habit into display and also localstorage
    const value = input.current.value;
    const nowDate = new Date();

    if (value) {
      if (document.querySelector(".checked")) {
        if (!isTaskModal) {
          const newHabit = {
            id: habits.length,
            value: value,
            color: selectedColor,
            completed: false,
            timePeriod:
              document.querySelector(".checked").previousElementSibling
                .innerHTML,
            dateCreated: `Created at: ${nowDate.getFullYear()}/${nowDate.getMonth()}/${nowDate.getDay()}`,
            dateHandler: nowDate.getDate(),
            daysPassed: 0,
            weeksPassed: 1,
            monthsPassed: 1,
          };
          setHabits((prevValue) => {
            const updatedHabits = [...prevValue, newHabit];
            localStorage.setItem("habits", JSON.stringify(updatedHabits));
            return updatedHabits;
          });
        } else if (isTaskModal) {
          const newTask = {
            id: tasks.length,
            value: value,
            color: selectedColor,
            completed: false,
            timePeriod:
              document.querySelector(".checked").previousElementSibling
                .innerHTML,
            dateCreated: `Created at: ${nowDate.getFullYear()}/${nowDate.getMonth()}/${nowDate.getDay()}`,
            dateHandler: nowDate.getDate(),
            daysPassed: 0,
            weeksPassed: 1,
            monthsPassed: 1,
          };
          setTasks((prevValues) => {
            const updatedTasks = [...prevValues, newTask];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
          });
          console.log('task created')
        }
        setShowModal(!showModal);
      } else {
        setError("Please select a time period first");
      }
    } else {
      setError("please enter a habit first");
    }
  };

  const modalHider = () => {
    setShowModal(!showModal);
  };

  const timeCheckHandler = (e) => {
    let timeRadios = document.querySelectorAll(".radio");
    timeRadios.forEach((radio) => {
      radio.classList.remove("checked");
    });
    e.target.classList.add("checked");
  };

  const colorPicker = (e) => {
    document.querySelectorAll(".color").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.remove("active");
    e.target.classList.remove("color");
    const newColor = e.target.className;
    setSelectedColor(newColor);
    e.target.classList.add("color");
    e.target.classList.add("active");
  };
  
  return (
    <div className="modal-container">
      <div className="close-btn" onClick={modalHider}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
          />
        </svg>
      </div>
      <div className="header">
        <h1>
          Enter the {!isTaskModal && "habit"}
          {isTaskModal && "task"} title and time
        </h1>
      </div>
      
      <div className="body">
        <input type="text" ref={input} />
        <div className="radio-container">
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
        <div className="color-radio-container">
          <div className="blue color active" onClick={colorPicker}></div>
          <div className="green color" onClick={colorPicker}></div>
          <div className="red color" onClick={colorPicker}></div>
          <div className="orange color" onClick={colorPicker}></div>
          <div className="yellow color" onClick={colorPicker}></div>
          <div className="purple color" onClick={colorPicker}></div>
          <div className="pink color" onClick={colorPicker}></div>
        </div>
      </div>
      <div className="error-modal">
        <h2>
          {error} {error && "!"}
        </h2>
      </div>
      <div className="btn">
        <button
          onClick={() => {
            Add();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
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