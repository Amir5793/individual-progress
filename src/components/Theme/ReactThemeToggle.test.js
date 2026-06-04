import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReactThemeToggleButton from "./ReactThemeToggle";

describe("ReactThemeToggleButton", () => {
  it("renders a checkbox input", () => {
    const { container } = render(
      <ReactThemeToggleButton isDark={false} onChange={jest.fn()} />
    );
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
  });

  it("sets aria-label for light mode when isDark is true", () => {
    const { container } = render(
      <ReactThemeToggleButton isDark={true} onChange={jest.fn()} />
    );
    const label = container.querySelector("label");
    expect(label).toHaveAttribute("aria-label", "Activate light mode");
  });

  it("sets aria-label for dark mode when isDark is false", () => {
    const { container } = render(
      <ReactThemeToggleButton isDark={false} onChange={jest.fn()} />
    );
    const label = container.querySelector("label");
    expect(label).toHaveAttribute("aria-label", "Activate dark mode");
  });

  it("calls onChange when checkbox is toggled", () => {
    const onChange = jest.fn();
    const { container } = render(
      <ReactThemeToggleButton isDark={false} onChange={onChange} />
    );
    const input = container.querySelector('input[type="checkbox"]');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("checkbox is checked when isDark is true and invertedIconLogic is false", () => {
    const { container } = render(
      <ReactThemeToggleButton isDark={true} onChange={jest.fn()} />
    );
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
  });

  it("checkbox is not checked when isDark is true and invertedIconLogic is true", () => {
    const { container } = render(
      <ReactThemeToggleButton
        isDark={true}
        onChange={jest.fn()}
        invertedIconLogic
      />
    );
    const input = container.querySelector('input[type="checkbox"]');
    expect(input).not.toBeChecked();
  });
});
