import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LiveboardInput.css"; // Import the CSS file

const LiveboardInput = ({
  setLiveboardID,
  setThoughtSpotHost,
  initializeThoughtSpot,
}) => {
  const [input, setInput] = useState("");
  const [host, setHost] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleHostChange = (e) => {
    setHost(e.target.value);
  };

  const handleSubmit = () => {
    setLiveboardID(input);
    setThoughtSpotHost(host);
    initializeThoughtSpot(host);
    history.push("/liveboard");
  };

  return (
    <div className="input-container">
      <h1>Welcome to easyEmbed</h1>
      <h2>Enter ThoughtSpot Host</h2>
      <input
        type="text"
        value={host}
        onChange={handleHostChange}
        placeholder="https://your-thoughtspot-host.com"
      />
      <h2>Enter Liveboard ID</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Liveboard ID"
      />
      <button onClick={handleSubmit}>Submit</button>
      <p className="created-by">© Built wid ♥ by Aman Bhattarai | 2025</p>
    </div>
  );
};

export default LiveboardInput;
