import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toggler from "./Toggler";

describe("Toggler", () => {
  it("renders Tasks and Habits toggle options", () => {
    const setToggle = jest.fn();
    render(<Toggler toggle="Tasks" setToggle={setToggle} />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("Habits")).toBeInTheDocument();
  });

  it("calls setToggle with 'Habits' when Habits is clicked", () => {
    const setToggle = jest.fn();
    render(<Toggler toggle="Tasks" setToggle={setToggle} />);
    fireEvent.click(screen.getByText("Habits"));
    expect(setToggle).toHaveBeenCalledWith("Habits");
  });

  it("calls setToggle with 'Tasks' when Tasks is clicked", () => {
    const setToggle = jest.fn();
    render(<Toggler toggle="Tasks" setToggle={setToggle} />);
    fireEvent.click(screen.getByText("Tasks"));
    expect(setToggle).toHaveBeenCalledWith("Tasks");
  });

  it("applies active-toggle class to the default Tasks option", () => {
    const setToggle = jest.fn();
    render(<Toggler toggle="Tasks" setToggle={setToggle} />);
    const tasksEl = screen.getByText("Tasks");
    expect(tasksEl).toHaveClass("active-toggle");
  });

  it("moves active-toggle class on click", () => {
    const setToggle = jest.fn();
    render(<Toggler toggle="Tasks" setToggle={setToggle} />);
    const habitsEl = screen.getByText("Habits");
    fireEvent.click(habitsEl);
    expect(habitsEl).toHaveClass("active-toggle");
  });
});
