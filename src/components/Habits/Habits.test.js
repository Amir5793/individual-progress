import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Habits from "./Habits";

describe("Habits", () => {
  const dailyHabit = {
    id: 0,
    value: "Daily Habit",
    color: "blue",
    completed: false,
    timePeriod: "Daily",
    dateCreated: "Created at: 2025/1/3",
    dateHandler: new Date().getDate(),
    daysPassed: 0,
    weeksPassed: 1,
    monthsPassed: 1,
  };

  const weeklyHabit = {
    id: 1,
    value: "Weekly Habit",
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
      <Habits
        showModal={false}
        setShowModal={jest.fn()}
        habits={[]}
        setHabits={jest.fn()}
      />
    );
    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("renders daily habits by default", () => {
    render(
      <Habits
        showModal={false}
        setShowModal={jest.fn()}
        habits={[dailyHabit, weeklyHabit]}
        setHabits={jest.fn()}
      />
    );
    expect(screen.getByText("Daily Habit")).toBeInTheDocument();
    expect(screen.queryByText("Weekly Habit")).not.toBeInTheDocument();
  });

  it("switches to weekly habits when Weekly tab is clicked", () => {
    render(
      <Habits
        showModal={false}
        setShowModal={jest.fn()}
        habits={[dailyHabit, weeklyHabit]}
        setHabits={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText("Weekly"));
    expect(screen.getByText("Weekly Habit")).toBeInTheDocument();
    expect(screen.queryByText("Daily Habit")).not.toBeInTheDocument();
  });

  it("hides content when showModal is truthy", () => {
    render(
      <Habits
        showModal="habit"
        setShowModal={jest.fn()}
        habits={[dailyHabit]}
        setHabits={jest.fn()}
      />
    );
    expect(screen.queryByText("Daily")).not.toBeInTheDocument();
  });

  it("renders progress bar showing 0/1 for one incomplete habit", () => {
    render(
      <Habits
        showModal={false}
        setShowModal={jest.fn()}
        habits={[dailyHabit]}
        setHabits={jest.fn()}
      />
    );
    expect(screen.getByText("0/1")).toBeInTheDocument();
  });

  it("calls setHabits with empty array when clear all is clicked", () => {
    const setHabits = jest.fn();
    const { container } = render(
      <Habits
        showModal={false}
        setShowModal={jest.fn()}
        habits={[dailyHabit]}
        setHabits={setHabits}
      />
    );
    const clearAll = container.querySelector(".clear-all");
    fireEvent.click(clearAll);
    expect(setHabits).toHaveBeenCalledWith([]);
  });
});
