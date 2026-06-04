import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Task from "./Task";

describe("Task", () => {
  const defaultProps = {
    id: 1,
    name: "Test Task",
    completed: false,
    dateCreated: "Created at: 2025/1/3",
    color: "blue",
    setTasks: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    defaultProps.setTasks.mockClear();
  });

  it("renders task name and date", () => {
    render(<Task {...defaultProps} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Created at: 2025/1/3")).toBeInTheDocument();
  });

  it("renders without completed class when not completed", () => {
    render(<Task {...defaultProps} />);
    const header = screen.getByText("Test Task");
    expect(header).not.toHaveClass("completed");
  });

  it("renders with completed class when completed", () => {
    render(<Task {...defaultProps} completed={true} />);
    const header = screen.getByText("Test Task");
    expect(header).toHaveClass("completed");
  });

  it("applies color class to container", () => {
    const { container } = render(<Task {...defaultProps} />);
    const taskContainer = container.querySelector(".container");
    expect(taskContainer).toHaveClass("blue");
  });

  it("toggles completion when checkbox is clicked", () => {
    render(<Task {...defaultProps} />);
    const checkbox = document.querySelector(".checkbox");
    fireEvent.click(checkbox);
    expect(defaultProps.setTasks).toHaveBeenCalled();
  });

  it("calls setTasks updater that toggles the matching task", () => {
    const setTasks = jest.fn((updater) => {
      const prev = [
        { id: 1, value: "Test Task", completed: false },
        { id: 2, value: "Other Task", completed: false },
      ];
      return updater(prev);
    });
    render(<Task {...defaultProps} setTasks={setTasks} />);
    const checkbox = document.querySelector(".checkbox");
    fireEvent.click(checkbox);
    const result = setTasks.mock.results[0].value;
    expect(result[0].completed).toBe(true);
    expect(result[1].completed).toBe(false);
  });

  it("deletes task when delete icon is clicked", () => {
    const setTasks = jest.fn((updater) => {
      const prev = [
        { id: 1, value: "Test Task", completed: false },
        { id: 2, value: "Other Task", completed: false },
      ];
      return updater(prev);
    });
    const { container } = render(<Task {...defaultProps} setTasks={setTasks} />);
    const deleteBtn = container.querySelector("svg:not(.checkbox)");
    fireEvent.click(deleteBtn);
    const result = setTasks.mock.results[0].value;
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});
