import { useState, useEffect, useCallback } from "react";
import "./ChipInput.css"; // Link to our CSS file

/**
 * ChipInput Component
 * A reusable input field that converts text entries into discrete, removable "chips".
 *
 * @param {object} props - Component props.
 * @param {string} [props.placeholder="Add new item..."] - Placeholder text for the input field.
 * @param {string[]} [props.initialChips=[]] - An array of strings to pre-populate the chips.
 * @param {function(string[]): void} [props.onChipsChange] - Callback function called with the current array of chips whenever it changes.
 * @param {function(string): boolean} [props.validateChip] - Optional validation function; returns true if chip is valid, false otherwise.
 */
const ChipInput = ({
  placeholder = "Add new item...",
  initialChips = [],
  onChipsChange,
  validateChip,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState(initialChips);

  // Effect to call onChipsChange whenever the chips array updates
  useEffect(() => {
    if (onChipsChange) {
      onChipsChange(chips);
    }
  }, [chips, onChipsChange]);

  const addChip = useCallback(
    (value) => {
      const trimmedValue = value.trim();
      if (trimmedValue === "") {
        return; // Do not add empty chips
      }

      // Optional: Check for duplicates if needed (not in current requirements but common)
      // if (chips.includes(trimmedValue)) {
      //   console.warn(`Chip "${trimmedValue}" already exists.`);
      //   return;
      // }

      // Validate chip if a validator function is provided
      if (validateChip && !validateChip(trimmedValue)) {
        console.warn(`Chip "${trimmedValue}" failed validation.`);
        // Optionally provide user feedback here (e.g., a temporary error message)
        return;
      }

      setChips((prevChips) => [...prevChips, trimmedValue]);
      setInputValue(""); // Clear input after adding
    },
    [chips, validateChip]
  ); // Dependency array for useCallback

  const removeChip = useCallback((chipToRemove) => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToRemove));
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    // Add chip on Enter or Tab
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault(); // Prevent default form submission or tab behavior
      addChip(inputValue);
    }
    // Remove last chip on Backspace if input is empty
    else if (e.key === "Backspace" && inputValue === "") {
      // Only remove if there are chips
      if (chips.length > 0) {
        setChips((prevChips) => prevChips.slice(0, prevChips.length - 1));
      }
    }
  };

  return (
    <div className="chip-input-container">
      <div className="chips-display">
        {chips.map((chip, index) => (
          <div key={chip + index} className="chip">
            {" "}
            {/* Using chip + index for unique key,
                                                     better to use a unique ID if chips can be duplicated */}
            {chip}
            <button
              type="button"
              className="chip-remove-button"
              onClick={() => removeChip(chip)}
              aria-label={`Remove ${chip}`} // Accessibility improvement
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="chip-input-field"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        aria-label="Add new chip" // Accessibility improvement
      />
    </div>
  );
};

export default ChipInput;
