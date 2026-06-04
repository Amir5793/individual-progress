import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Tasks from "./Tasks";

describe("Tasks", () => {
  const dailyTask = {
    id: 0,
    value: "Daily Task",
    color: "blue",
    completed: false,
    timePeriod: "Daily",
    dateCreated: "Created at: 2025/1/3",
    dateHandler: new Date().getDate(),
    daysPassed: 0,
    weeksPassed: 1,
    monthsPassed: 1,
  };

  const weeklyTask = {
    id: 1,
    value: "Weekly Task",
    color: "green",
    completed: false,
    timePeriod: "Weekly",
    dateCreated: "Created at: 2025/1/3",
    dateHandler: new Date().getDate(),
    daysPassed: 0,
    weeksPassed: 1,
    monthsPassed: 1,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("renders time period tabs (Daily, Weekly, Monthly)", () => {
    render(
      <Tasks
        showModal={false}
        setShowModal={jest.fn()}
        tasks={[]}
        setTasks={jest.fn()}
      />
    );
    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("renders daily tasks by default", () => {
    render(
      <Tasks
        showModal={false}
        setShowModal={jest.fn()}
        tasks={[dailyTask, weeklyTask]}
        setTasks={jest.fn()}
      />
    );
    expect(screen.getByText("Daily Task")).toBeInTheDocument();
    expect(screen.queryByText("Weekly Task")).not.toBeInTheDocument();
  });

  it("switches to weekly tasks when Weekly tab is clicked", () => {
    render(
      <Tasks
        showModal={false}
        setShowModal={jest.fn()}
        tasks={[dailyTask, weeklyTask]}
        setTasks={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText("Weekly"));
    expect(screen.getByText("Weekly Task")).toBeInTheDocument();
    expect(screen.queryByText("Daily Task")).not.toBeInTheDocument();
  });

  it("hides content when showModal is truthy", () => {
    render(
      <Tasks
        showModal="task"
        setShowModal={jest.fn()}
        tasks={[dailyTask]}
        setTasks={jest.fn()}
      />
    );
    expect(screen.queryByText("Daily")).not.toBeInTheDocument();
  });

  it("renders progress bar showing 0/1 for one incomplete task", () => {
    render(
      <Tasks
        showModal={false}
        setShowModal={jest.fn()}
        tasks={[dailyTask]}
        setTasks={jest.fn()}
      />
    );
    expect(screen.getByText("0/1")).toBeInTheDocument();
  });

  it("calls setTasks with empty array when clear all is clicked", () => {
    const setTasks = jest.fn();
    const { container } = render(
      <Tasks
        showModal={false}
        setShowModal={jest.fn()}
        tasks={[dailyTask]}
        setTasks={setTasks}
      />
    );
    const clearAll = container.querySelector(".clear-all");
    fireEvent.click(clearAll);
    expect(setTasks).toHaveBeenCalledWith([]);
  });
});
