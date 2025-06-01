import { useState } from "react";
import ChipInput from "./components/ChipInput";
import "./App.css";

function App() {
  const [chips, setChips] = useState([]);

  const handleChange = (newChips) => {
    setChips(newChips);
  };

  const handleAdd = (chip) => {
    console.log("Added:", chip);
  };

  const handleRemove = (chip) => {
    console.log("Removed:", chip);
  };

  const validateChip = (input) => {
    if (input.length < 3) return "Chip must be at least 3 characters long";
    if (input.length > 20) return "Chip must be less than 20 characters";
    return "";
  };

  return (
    <div className="app">
      <h1>Chip Input Demo</h1>
      <div className="demo-section">
        <h2>Basic Usage</h2>
        <ChipInput
          value={chips}
          onChange={handleChange}
          onAdd={handleAdd}
          onRemove={handleRemove}
          placeholder="Type and press Enter..."
        />
      </div>

      <div className="demo-section">
        <h2>With Validation</h2>
        <ChipInput
          value={chips}
          onChange={handleChange}
          validate={validateChip}
          placeholder="Enter 3-20 characters..."
        />
      </div>

      <div className="demo-section">
        <h2>With Max Chips</h2>
        <ChipInput
          value={chips}
          onChange={handleChange}
          maxChips={3}
          placeholder="Maximum 3 chips..."
        />
      </div>

      <div className="demo-section">
        <h2>Disabled State</h2>
        <ChipInput
          value={chips}
          onChange={handleChange}
          disabled
          placeholder="This input is disabled..."
        />
      </div>
    </div>
  );
}

export default App;
