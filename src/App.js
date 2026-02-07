import React, { useState, useEffect } from "react";
import "./App.css";
import ToggleButton from "./components/Theme/ReactThemeToggle";
import Toggler from "./components/Toggler/Toggler.js";
import AddButton from "./components/AddButton/AddButton.js"
import Tasks from "./components/Tasks/Tasks.js";
import Targets from "./components/Targets/Targets.js";
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
  let [showModal, setShowModal] = useState();
  let [toggle, setToggle] = useState("Tasks")
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) === true ? false : true
  );
  useEffect(() => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      "data-theme",
      !darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", JSON.stringify(darkMode));
  };

  return (
    <div className="App">
      <Toggler
      toggle={toggle}
      setToggle={setToggle}
      ></Toggler>
      {toggle === "Tasks" &&
        <Tasks
          showModal={showModal}
          setShowModal={setShowModal}
        ></Tasks>
      }
      {toggle === "Targets" &&
        <Targets 
        showModal = {showModal}
        setShowModal = {setShowModal}/>
      }
      {!showModal &&
        <AddButton
          showModal={showModal}
          setShowModal={setShowModal}
        ></AddButton>
      }

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
