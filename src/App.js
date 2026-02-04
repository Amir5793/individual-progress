import React, { useState, useEffect } from "react";
import ToggleButton from "./components/Theme/ReactThemeToggle";
import "./App.css";
import Tasks from "./components/Tasks/Tasks.js";
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
      <Tasks></Tasks>
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
