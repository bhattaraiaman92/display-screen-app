import React, { useEffect, useRef, useState } from "react";
import { LiveboardEmbed, Action } from "@thoughtspot/visual-embed-sdk/react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import "./dashboard.css";

export const Dashboard = () => {
  const liveboardRef = useRef(null);
  const [liveboardGuid, setLiveboardGuid] = useState(null);
  const [refreshIntervalMs, setRefreshIntervalMs] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const history = useHistory();

  // Load configuration from localStorage
  useEffect(() => {
    const savedGuid = localStorage.getItem("liveboardGuid");
    const savedIntervalMs = localStorage.getItem("refreshIntervalMs");

    if (!savedGuid) {
      // If no GUID is saved, redirect to homepage
      history.push("/");
      return;
    }

    setLiveboardGuid(savedGuid);
    if (savedIntervalMs) {
      setRefreshIntervalMs(parseInt(savedIntervalMs, 10));
    }
    setIsLoading(false);
  }, [history]);

  // Set up refresh interval
  useEffect(() => {
    if (!liveboardGuid || !refreshIntervalMs || refreshIntervalMs <= 0) {
      return;
    }

    // Function to refresh the liveboard
    const refreshLiveboard = () => {
      if (liveboardRef.current) {
        try {
          liveboardRef.current.render();
          setLastRefresh(new Date());
        } catch (error) {
          console.error("Error refreshing liveboard:", error);
        }
      }
    };

    // Initial render
    refreshLiveboard();

    // Set up interval for auto-refresh
    const intervalId = setInterval(refreshLiveboard, refreshIntervalMs);

    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [liveboardGuid, refreshIntervalMs]);

  const handleBackToHome = () => {
    history.push("/");
  };

  if (isLoading || !liveboardGuid) {
    return (
      <div className="dashboard-container">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div 
        className="top-hover-zone"
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
      />
      <Header 
        onBack={handleBackToHome} 
        lastRefresh={lastRefresh}
        isHovered={isHeaderHovered}
        onHoverChange={setIsHeaderHovered}
      />
      <div className="liveboard-wrapper">
        <LiveboardEmbed
          ref={liveboardRef}
          frameParams={{
            height: "100vh",
            width: "100%",
          }}
          fullHeight="true"
          liveboardId={liveboardGuid}
          hideLiveboardHeader={true}
          hiddenActions={[Action.VerifiedLiveboard]}
          customCSS={{
            rules_UNSTABLE: {
              ".answer-content-module__answerVizContainer": {
                "border-radius": "10px",
                padding: "5px !important",
                margin: "0px",
              },
              ".answer-title-module__descriptionTextOneLine": {
                display: "none",
              },
              ".ts-embed": {
                margin: "0px !important",
                padding: "0px !important",
                width: "100% !important",
                height: "100% !important",
              },
              "body": {
                margin: "0px !important",
                padding: "0px !important",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
