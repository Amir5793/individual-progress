import React, { useState, useEffect } from "react";
import "./App.css";
import ToggleButton from "./components/Theme/ReactThemeToggle";
import Toggler from "./components/Toggler/Toggler.js";
import AddButton from "./components/AddButton/AddButton.js";
import Tasks from "./components/Tasks/Tasks.js";
import Habits from "./components/Habits/Habits.js";
import AddModal from "./components/AddModal/AddModal.js";
// import { computeHeadingLevel } from "@testing-library/dom";
// import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 1vw;
  left: 1vw;
  padding: 0.5em;
`;

function App() {
  let [showModal, setShowModal] = useState(false);
  let [toggle, setToggle] = useState("Tasks");
  let [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks"))
      ? JSON.parse(localStorage.getItem("tasks"))
      : [],
  );
  let [habits, setHabits] = useState(
    JSON.parse(localStorage.getItem("habits"))
      ? JSON.parse(localStorage.getItem("habits"))
      : [],
  );
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) === true ? false : true,
  );
  useEffect(() => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light",
    );
    localStorage.setItem("theme", JSON.stringify(darkMode));
  };

  return (
    <div className="App">
      {!showModal && <Toggler toggle={toggle} setToggle={setToggle}></Toggler>}
      {toggle === "Habits" && (
        <Habits showModal={showModal} setShowModal={setShowModal} habits={habits} setHabits={setHabits} />
      )}
      {toggle === "Tasks" && (
        <Tasks showModal={showModal} setShowModal={setShowModal} tasks={tasks} setTasks={setTasks}></Tasks>
      )}
      {!showModal && (
        <AddButton
          showModal={showModal}
          setShowModal={setShowModal}
        ></AddButton>
      )}
      {showModal === "habit" && (
        <AddModal
          isHabitModal={true}
          isTaskModal={false}
          showModal={showModal}
          setShowModal={setShowModal}
          setHabits={setHabits}
          habits={habits}
          setTasks={setTasks}
          tasks={tasks}
        ></AddModal>
      )}
      {showModal === "task" && (
        <AddModal
          showModal={showModal}
          setShowModal={setShowModal}
          setTasks={setTasks}
          setHabits={setHabits}
          habits={habits}
          tasks={tasks}
          isTaskModal={true}
        ></AddModal>
      )}

      <Wrapper>
        <ToggleButton
          isDark={darkMode}
          invertedIconLogic
          onChange={toggleDarkMode}
        />
      </Wrapper>
    </div>
  );
}

export default App;
