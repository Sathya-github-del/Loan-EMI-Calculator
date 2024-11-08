import React, { useState } from "react";
import './App.css';

function App() {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [emi, setEmi] = useState("");
  const [monthlyInterestRate, setMonthlyInterestRate] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");

  const handleEmi = () => {
    const principal = parseFloat(amount); // Principal amount
    const annualRate = parseFloat(interestRate); // Get annual interest rate as a number
    const rate = annualRate / 100; // Convert to decimal
    const monthlyRate = rate / 12; // Monthly interest rate
    const time = parseFloat(tenure) * 12; // Total months

    // Input validation
    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate < 0 || time <= 0) {
      alert("Enter valid details");
      return;
    }

    // EMI calculation using the correct formula
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) /
      (Math.pow(1 + monthlyRate, time) - 1);

    // Setting state values
    setEmi(emi);
    setMonthlyPayment(emi.toFixed(2));
    setMonthlyInterestRate((monthlyRate * 100).toFixed(4));
    setAnnualInterestRate(annualRate);
  };

  return (
    <div className="container">
      <div className="loan">
        <h1>EMI Calculator</h1>
        <label>
          Loan Amount (₹):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Interest Rate (Annual %):
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </label>
        <label>
          Tenure (in years):
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </label>
        <button onClick={handleEmi}>Calculate EMI</button>

        <h2>Results</h2>
        <p>EMI: ₹{emi !== "" ? emi.toFixed(2) : "0.00"}</p>
        <p>Monthly Payment: ₹{monthlyPayment !== "" ? monthlyPayment : "0.00"}</p>
        <p>Monthly Interest Rate: {monthlyInterestRate !== "" ? monthlyInterestRate + "%" : "0.00%"}</p>
        <p>Annual Interest Rate: {annualInterestRate !== "" ? annualInterestRate + "%" : "0.00%"}</p>
      </div>
    </div>
  );
}

export default App;
