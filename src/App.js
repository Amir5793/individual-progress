import React, { useState, useEffect } from "react";
import "./App.css";
import Tasks from "./Tasks/Tasks.js";
import AddTaskModal from "./Tasks/AddTaskModal/AddTaskModal.js";
import { computeHeadingLevel } from "@testing-library/dom";

function App() {
  let [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  let [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      {!showModal && (
        <div className="tasks-countainer">
          <Tasks tasks={tasks} setTasks={setTasks}></Tasks>
          <div
            className="addBtn"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
              />
            </svg>
          </div>
        </div>
      )}
      {showModal && (
        <AddTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          setTasks={setTasks}
        ></AddTaskModal>
      )}
    </div>
  );
}

export default App;
