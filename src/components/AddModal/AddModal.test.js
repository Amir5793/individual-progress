import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddModal from "./AddModal";

describe("AddModal", () => {
  const defaultProps = {
    isHabitModal: false,
    isTaskModal: true,
    showModal: "task",
    setShowModal: jest.fn(),
    habits: [],
    setHabits: jest.fn(),
    tasks: [],
    setTasks: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    defaultProps.setShowModal.mockClear();
    defaultProps.setTasks.mockClear();
    defaultProps.setHabits.mockClear();
  });

  it("renders the modal with task title when isTaskModal is true", () => {
    render(<AddModal {...defaultProps} />);
    expect(screen.getByText(/enter the/i)).toBeInTheDocument();
    expect(screen.getByText(/task/i)).toBeInTheDocument();
  });

  it("renders the modal with habit title when isHabitModal is true", () => {
    render(
      <AddModal
        {...defaultProps}
        isHabitModal={true}
        isTaskModal={false}
        showModal="habit"
      />
    );
    expect(screen.getByText(/habit/i)).toBeInTheDocument();
  });

  it("renders time period radio buttons", () => {
    render(<AddModal {...defaultProps} />);
    expect(screen.getByLabelText("Daily")).toBeInTheDocument();
    expect(screen.getByLabelText("Weekly")).toBeInTheDocument();
    expect(screen.getByLabelText("Monthly")).toBeInTheDocument();
  });

  it("renders color picker elements", () => {
    const { container } = render(<AddModal {...defaultProps} />);
    const colors = container.querySelectorAll(".color");
    expect(colors.length).toBe(7);
  });

  it("shows error when submitting with empty input", () => {
    render(<AddModal {...defaultProps} />);
    const submitBtn = document.querySelector(".btn button");
    fireEvent.click(submitBtn);
    expect(screen.getByText(/please enter a habit first/i)).toBeInTheDocument();
  });

  it("shows error when submitting without selecting time period", () => {
    render(<AddModal {...defaultProps} />);
    const input = document.querySelector('input[type="text"]');
    fireEvent.change(input, { target: { value: "New Task" } });
    const submitBtn = document.querySelector(".btn button");
    fireEvent.click(submitBtn);
    expect(
      screen.getByText(/please select a time period first/i)
    ).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<AddModal {...defaultProps} />);
    const closeBtn = document.querySelector(".close-btn");
    fireEvent.click(closeBtn);
    expect(defaultProps.setShowModal).toHaveBeenCalled();
  });

  it("renders input field", () => {
    render(<AddModal {...defaultProps} />);
    const input = document.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
  });
});
