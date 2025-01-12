import React, { useEffect, useRef, useState } from "react";
import { LiveboardEmbed, Action } from "@thoughtspot/visual-embed-sdk/react";
import "./dashboard.css"; // Ensure correct import path

export const Dashboard = () => {
  const liveboardRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState("100vh"); // Full screen height

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

    // Set interval to refresh every 15 minutes (900,000 ms)
    const intervalId = setInterval(refreshLiveboard, 3600000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main-container">
      <div className="liveboard-container">
        <LiveboardEmbed
          ref={liveboardRef}
          frameParams={{ height: frameHeight, width: "100%" }} // Full screen width
          fullHeight="true"
          liveboardId="998f4484-4923-4d40-91b6-ad5d5099b553"
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
