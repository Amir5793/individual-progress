import React, { useState, useEffect } from "react";
import "./App.css";
import ToggleButton from "./components/Theme/ReactThemeToggle";
import Toggler from "./components/Toggler/Toggler.js";
import AddButton from "./components/AddButton/AddButton.js";
import ItemList from "./components/ItemList/ItemList.js";
import AddModal from "./components/AddModal/AddModal.js";
import { loadFromStorage } from "./utils/storage";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 1vw;
  left: 1vw;
  padding: 0.5em;
`;

function safeParseJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(fallback)
      ? Array.isArray(parsed) ? parsed : fallback
      : parsed;
  } catch {
    return fallback;
  }
}

function App() {
  let [showModal, setShowModal] = useState(false);
  let [toggle, setToggle] = useState("Tasks");
  let [tasks, setTasks] = useState(loadFromStorage("tasks"));
  let [habits, setHabits] = useState(loadFromStorage("habits"));
  const [darkMode, setDarkMode] = useState(
    safeParseJSON("theme", null) === true ? false : true,
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
        <ItemList
          showModal={showModal}
          storageKey="habits"
          parentItems={habits}
          setParentItems={setHabits}
        />
      )}
      {toggle === "Tasks" && (
        <ItemList
          showModal={showModal}
          storageKey="tasks"
          parentItems={tasks}
          setParentItems={setTasks}
        />
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
