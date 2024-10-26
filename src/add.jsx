import React, { useState } from "react";
import "./App.css";

const Add = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // The add function to calculate the sum
  function add(numbers) {
    if (!numbers) return 0;

    // Default delimiter is comma or newline
    let delimiter = /,|\\n/;
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\\n");
      const customDelimiter = parts[0].slice(2);
      delimiter = new RegExp(customDelimiter);
      numbers = parts[1];
    }

    const nums = numbers.split(delimiter).map(Number);
    const negativeNums = nums.filter((num) => num < 0);
    if (negativeNums.length) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNums.join(", ")}`
      );
    }

    return nums.reduce((sum, num) => sum + num, 0);
  }

  // Handle the calculation
  const handleCalculate = () => {
    try {
      const calcResult = add(input);
      setResult(calcResult);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1 className="header">String Calculator</h1>
      <div className="section">
        <input
          type="text"
          className="input"
          placeholder="Enter numbers (e.g.2,3 or //;\n1;2)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button className="button" onClick={handleCalculate}>
          Calculate
        </button>
      </div>
      {result !== null && <p>Result: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Add;
