import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Habit from "./Habit";

describe("Habit", () => {
  const defaultProps = {
    id: 1,
    name: "Exercise",
    completed: false,
    dateCreated: "Created at: 2025/1/3",
    color: "green",
    setHabits: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    defaultProps.setHabits.mockClear();
  });

  it("renders habit name and date", () => {
    render(<Habit {...defaultProps} />);
    expect(screen.getByText("Exercise")).toBeInTheDocument();
    expect(screen.getByText("Created at: 2025/1/3")).toBeInTheDocument();
  });

  it("renders without completed class when not completed", () => {
    render(<Habit {...defaultProps} />);
    const header = screen.getByText("Exercise");
    expect(header).not.toHaveClass("completed");
  });

  it("renders with completed class when completed", () => {
    render(<Habit {...defaultProps} completed={true} />);
    const header = screen.getByText("Exercise");
    expect(header).toHaveClass("completed");
  });

  it("applies color class to container", () => {
    const { container } = render(<Habit {...defaultProps} />);
    const habitContainer = container.querySelector(".container");
    expect(habitContainer).toHaveClass("green");
  });

  it("toggles completion when checkbox is clicked", () => {
    render(<Habit {...defaultProps} />);
    const checkbox = document.querySelector(".checkbox");
    fireEvent.click(checkbox);
    expect(defaultProps.setHabits).toHaveBeenCalled();
  });

  it("calls setHabits updater that toggles the matching habit", () => {
    const setHabits = jest.fn((updater) => {
      const prev = [
        { id: 1, value: "Exercise", completed: false },
        { id: 2, value: "Read", completed: false },
      ];
      return updater(prev);
    });
    render(<Habit {...defaultProps} setHabits={setHabits} />);
    const checkbox = document.querySelector(".checkbox");
    fireEvent.click(checkbox);
    const result = setHabits.mock.results[0].value;
    expect(result[0].completed).toBe(true);
    expect(result[1].completed).toBe(false);
  });

  it("deletes habit when delete icon is clicked", () => {
    const setHabits = jest.fn((updater) => {
      const prev = [
        { id: 1, value: "Exercise", completed: false },
        { id: 2, value: "Read", completed: false },
      ];
      return updater(prev);
    });
    const { container } = render(
      <Habit {...defaultProps} setHabits={setHabits} />
    );
    const deleteBtn = container.querySelector("svg:not(.checkbox)");
    fireEvent.click(deleteBtn);
    const result = setHabits.mock.results[0].value;
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });
});
