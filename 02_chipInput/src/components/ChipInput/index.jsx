import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const ChipInput = ({
  value = [],
  onChange,
  onAdd,
  onRemove,
  placeholder = "Add items...",
  maxChips,
  disabled = false,
  validate,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
    setError("");
  }, []);

  const validateInput = useCallback(
    (input) => {
      if (!input.trim()) return "Input cannot be empty";
      if (value.includes(input)) return "Item already exists";
      if (maxChips && value.length >= maxChips)
        return "Maximum chips limit reached";
      if (validate) return validate(input);
      return "";
    },
    [value, maxChips, validate]
  );

  const addChip = useCallback(
    (input) => {
      const trimmedInput = input.trim();
      const validationError = validateInput(trimmedInput);

      if (validationError) {
        setError(validationError);
        return;
      }

      const newChips = [...value, trimmedInput];
      onChange?.(newChips);
      onAdd?.(trimmedInput);
      setInputValue("");
      setError("");
    },
    [value, onChange, onAdd, validateInput]
  );

  const removeChip = useCallback(
    (index) => {
      const newChips = value.filter((_, i) => i !== index);
      onChange?.(newChips);
      onRemove?.(value[index]);
    },
    [value, onChange, onRemove]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;

      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addChip(inputValue);
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeChip(value.length - 1);
      }
    },
    [inputValue, value, addChip, removeChip, disabled]
  );

  const handleBlur = useCallback(() => {
    if (inputValue.trim()) {
      addChip(inputValue);
    }
  }, [inputValue, addChip]);

  return (
    <div className={`chip-input ${className}`}>
      <div className="chip-input__container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled}
          className="chip-input__input"
          aria-label="Add new item"
        />
      </div>
      {value.length > 0 && (
        <div className="chip-input__list">
          {value.map((chip, index) => (
            <div key={index} className="chip-input__chip">
              <span className="chip-input__chip-text">{chip}</span>
              <button
                type="button"
                className="chip-input__chip-remove"
                onClick={() => removeChip(index)}
                disabled={disabled}
                aria-label={`Remove ${chip}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <div className="chip-input__error">{error}</div>}
    </div>
  );
};

ChipInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  placeholder: PropTypes.string,
  maxChips: PropTypes.number,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  className: PropTypes.string,
};

export default ChipInput;
