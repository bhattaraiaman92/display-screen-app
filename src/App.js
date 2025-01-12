import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import LiveboardInput from "./LiveboardInput";

import { init, AuthType } from "@thoughtspot/visual-embed-sdk";

init({
  thoughtSpotHost: "https://se-thoughtspot-cloud.thoughtspot.cloud", // Ensure this is a valid URL
  authType: AuthType.None,
});

export default function App() {
  const [liveboardID, setLiveboardID] = useState("");

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <LiveboardInput setLiveboardID={setLiveboardID} />
          </Route>
          <Route path="/liveboard">
            <Dashboard liveboardID={liveboardID} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
