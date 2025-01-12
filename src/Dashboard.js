import React, { useEffect, useRef, useState } from "react";
import { LiveboardEmbed, Action } from "@thoughtspot/visual-embed-sdk/react";
import { useHistory } from "react-router-dom"; // Import useHistory
import "./dashboard.css"; // Ensure correct import path

export const Dashboard = ({ liveboardID }) => {
  const liveboardRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState("100vh"); // Full screen height
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    // Function to render the liveboard
    const refreshLiveboard = () => {
      if (liveboardRef.current) {
        // Render the liveboard
        liveboardRef.current.render();
      }
    };

    // Initial render of the liveboard
    refreshLiveboard();

    // Set interval to refresh every X minutes (time in ms)
    const intervalId = setInterval(refreshLiveboard, 6000000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to navigate back to the landing page
  const goToLandingPage = () => {
    history.push("/"); // Navigate to the root path (landing page)
  };

  return (
    <div className="main-container">
      <div className="liveboard-container">
        <LiveboardEmbed
          ref={liveboardRef}
          frameParams={{ height: frameHeight, width: "100%" }} // Full screen width
          fullHeight="true"
          liveboardId={liveboardID}
          hideLiveboardHeader={true} // Hide the Liveboard header
          hiddenActions={[Action.VerifiedLiveboard]} // Add hiddenActions prop
          customCSS={{
            rules_UNSTABLE: {
              ".answer-content-module__answerVizContainer": {
                "border-radius": "10px",
                padding: "5px !important",
                margin: "0px", // Reduce the gap by adjusting margin
              },
              ".answer-title-module__descriptionTextOneLine": {
                display: "none",
              },
              ".ts-embed": {
                margin: "0px", // Reduce the gap between the frame and objects
                padding: "0px", // Reduce the gap between the frame and objects
              },
            },
          }}
        />
      </div>
    </div>
  );
};
