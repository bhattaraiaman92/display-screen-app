import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div>
      <h2>Insert your Liveboard ID</h2>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Insert your Liveboard ID</button>
    </div>
  );
};

export default LiveboardInput;
