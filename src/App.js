import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import LiveboardInput from "./LiveboardInput";
import { init, AuthType } from "@thoughtspot/visual-embed-sdk";

export default function App() {
  const [liveboardID, setLiveboardID] = useState("");
  const [thoughtSpotHost, setThoughtSpotHost] = useState("");

  const initializeThoughtSpot = (host) => {
    init({
      thoughtSpotHost: host,
      authType: AuthType.None,
    });
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <LiveboardInput
              setLiveboardID={setLiveboardID}
              setThoughtSpotHost={setThoughtSpotHost}
              initializeThoughtSpot={initializeThoughtSpot}
            />
          </Route>
          <Route path="/liveboard">
            <Dashboard liveboardID={liveboardID} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
