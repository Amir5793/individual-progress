import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddButton from "./AddButton";

describe("AddButton", () => {
  it("renders the add button with Task and Habit options", () => {
    const setShowModal = jest.fn();
    render(<AddButton showModal={false} setShowModal={setShowModal} />);
    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(screen.getByText("Habit")).toBeInTheDocument();
  });

  it("calls setShowModal with 'task' when Task button is clicked", () => {
    const setShowModal = jest.fn();
    render(<AddButton showModal={false} setShowModal={setShowModal} />);
    fireEvent.click(screen.getByText("Task"));
    expect(setShowModal).toHaveBeenCalledWith("task");
  });

  it("calls setShowModal with 'habit' when Habit button is clicked", () => {
    const setShowModal = jest.fn();
    render(<AddButton showModal={false} setShowModal={setShowModal} />);
    fireEvent.click(screen.getByText("Habit"));
    expect(setShowModal).toHaveBeenCalledWith("habit");
  });

  it("renders svg add icon", () => {
    const setShowModal = jest.fn();
    const { container } = render(
      <AddButton showModal={false} setShowModal={setShowModal} />
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
