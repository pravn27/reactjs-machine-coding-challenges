import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import ChipInput from "../index";

describe("ChipInput", () => {
  const mockOnChange = jest.fn();
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with empty value", () => {
    render(<ChipInput value={[]} onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText("Add items...")).toBeInTheDocument();
  });

  it("renders with initial chips", () => {
    const chips = ["chip1", "chip2"];
    render(<ChipInput value={chips} onChange={mockOnChange} />);
    expect(screen.getByText("chip1")).toBeInTheDocument();
    expect(screen.getByText("chip2")).toBeInTheDocument();
  });

  it("adds chip on Enter key", async () => {
    render(<ChipInput value={[]} onChange={mockOnChange} onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText("Add items...");
    await userEvent.type(input, "new chip{enter}");
    expect(mockOnChange).toHaveBeenCalledWith(["new chip"]);
    expect(mockOnAdd).toHaveBeenCalledWith("new chip");
  });

  it("adds chip on comma", async () => {
    render(<ChipInput value={[]} onChange={mockOnChange} onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText("Add items...");
    await userEvent.type(input, "new chip,");
    expect(mockOnChange).toHaveBeenCalledWith(["new chip"]);
    expect(mockOnAdd).toHaveBeenCalledWith("new chip");
  });

  it("removes chip on click", () => {
    render(
      <ChipInput
        value={["chip1"]}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
      />
    );
    const removeButton = screen.getByLabelText("Remove chip1");
    fireEvent.click(removeButton);
    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(mockOnRemove).toHaveBeenCalledWith("chip1");
  });

  it("removes last chip on backspace when input is empty", () => {
    render(
      <ChipInput
        value={["chip1", "chip2"]}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
      />
    );
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Backspace" });
    expect(mockOnChange).toHaveBeenCalledWith(["chip1"]);
    expect(mockOnRemove).toHaveBeenCalledWith("chip2");
  });

  it("shows error for duplicate chip", async () => {
    render(<ChipInput value={["existing"]} onChange={mockOnChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "existing{enter}");
    expect(screen.getByText("Item already exists")).toBeInTheDocument();
  });

  it("shows error when max chips reached", async () => {
    render(
      <ChipInput value={["chip1"]} onChange={mockOnChange} maxChips={1} />
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "chip2{enter}");
    expect(screen.getByText("Maximum chips limit reached")).toBeInTheDocument();
  });

  it("handles custom validation", async () => {
    const validate = (input) => (input.length < 3 ? "Too short" : "");
    render(
      <ChipInput value={[]} onChange={mockOnChange} validate={validate} />
    );
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "ab{enter}");
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });

  it("disables input when disabled prop is true", () => {
    render(<ChipInput value={[]} onChange={mockOnChange} disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});
