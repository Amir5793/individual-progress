import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders the progress text with completed/total", () => {
    render(<ProgressBar completedValuesLength={2} valuesLength={5} />);
    expect(screen.getByText("2/5")).toBeInTheDocument();
  });

  it("renders 0/0 when no values", () => {
    render(<ProgressBar completedValuesLength={0} valuesLength={0} />);
    expect(screen.getByText("0/0")).toBeInTheDocument();
  });

  it("renders progress bar elements", () => {
    const { container } = render(
      <ProgressBar completedValuesLength={1} valuesLength={4} />
    );
    expect(container.querySelector(".progress-bar")).toBeInTheDocument();
    expect(container.querySelectorAll(".bar").length).toBe(2);
  });

  it("renders with all completed", () => {
    render(<ProgressBar completedValuesLength={3} valuesLength={3} />);
    expect(screen.getByText("3/3")).toBeInTheDocument();
  });
});
