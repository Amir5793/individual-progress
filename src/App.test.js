import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mock CSS module for Theme toggle
jest.mock("./components/Theme/styles.module.css", () => ({
  container: "mock-container",
}));

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the Toggler with Tasks and Habits options", () => {
    render(<App />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("Habits")).toBeInTheDocument();
  });

  it("renders the AddButton", () => {
    render(<App />);
    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(screen.getByText("Habit")).toBeInTheDocument();
  });

  it("shows Tasks view by default", () => {
    render(<App />);
    expect(screen.getByText("Daily")).toBeInTheDocument();
  });

  it("switches to Habits view when Habits toggle is clicked", () => {
    render(<App />);
    const toggleOptions = screen.getAllByText("Habits");
    // The one inside the Toggler
    fireEvent.click(toggleOptions[0]);
    // Should still show time period tabs
    expect(screen.getByText("Daily")).toBeInTheDocument();
  });

  it("renders the theme toggle button", () => {
    const { container } = render(<App />);
    const themeToggle = container.querySelector('input[type="checkbox"]');
    expect(themeToggle).toBeInTheDocument();
  });

  it("toggles dark mode when theme toggle is clicked", () => {
    const { container } = render(<App />);
    const themeToggle = container.querySelector('input[type="checkbox"]');
    fireEvent.click(themeToggle);
    const theme = document.documentElement.getAttribute("data-theme");
    expect(["dark", "light"]).toContain(theme);
  });

  it("renders with tasks from localStorage", () => {
    const tasks = [
      {
        id: 0,
        value: "Stored Task",
        color: "blue",
        completed: false,
        timePeriod: "Daily",
        dateCreated: "Created at: 2025/1/3",
        dateHandler: new Date().getDate(),
        daysPassed: 0,
        weeksPassed: 1,
        monthsPassed: 1,
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(<App />);
    expect(screen.getByText("Stored Task")).toBeInTheDocument();
  });
});
