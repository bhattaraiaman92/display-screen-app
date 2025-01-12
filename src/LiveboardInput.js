import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LiveboardInput.css"; // Import the CSS file

const LiveboardInput = ({ setLiveboardID }) => {
  const [input, setInput] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    setLiveboardID(input);
    history.push("/liveboard");
  };

  return (
    <div className="input-container">
      <h1>Welcome to easyEmbed</h1>
      <h2>Enter Liveboard ID</h2>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <p className="created-by">© Built wid ♥ by Aman Bhattarai | 2025</p>
    </div>
  );
};

export default LiveboardInput;
