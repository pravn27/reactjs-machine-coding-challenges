import React, { useState } from "react";
import ChipInput from "./components/ChipInput/ChipInput"; // Import the ChipInput component
import "./App.css"; // Optional, for basic app styling

function App() {
  const [currentChips, setCurrentChips] = useState([]);
  const [emailChips, setEmailChips] = useState([]);

  // Example validation function for emails
  const validateEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="App">
      {/* <h1>Frontend System Design: Chip Input Box</h1> */}

      <section className="example-section">
        <h2>Basic Chip Input</h2>
        <p>
          Type and press Enter or Tab to add. Backspace on empty input removes
          last chip.
        </p>
        <div className="component-wrapper">
          <ChipInput
            placeholder="Add tags..."
            initialChips={["React", "CSS"]}
            onChipsChange={setCurrentChips} // Get chips state in parent
          />
        </div>
        <p>Current tags in parent: {currentChips.join(", ") || "None"}</p>
      </section>

      <section className="example-section">
        <h2>Chip Input with Validation (Emails)</h2>
        <p>Only valid email addresses can be added as chips.</p>
        <div className="component-wrapper">
          <ChipInput
            placeholder="Add email addresses..."
            validateChip={validateEmail}
            onChipsChange={setEmailChips}
          />
        </div>
        <p>Current emails in parent: {emailChips.join(", ") || "None"}</p>
      </section>
    </div>
  );
}

export default App;
