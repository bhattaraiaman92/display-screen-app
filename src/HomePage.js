import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { init, AuthType } from "@thoughtspot/visual-embed-sdk";
import "./HomePage.css";

const HomePage = () => {
  const [thoughtSpotUrl, setThoughtSpotUrl] = useState("");
  const [liveboardGuid, setLiveboardGuid] = useState("");
  const [refreshInterval, setRefreshInterval] = useState("");
  const [intervalUnit, setIntervalUnit] = useState("seconds");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  // Load saved values from localStorage on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem("thoughtSpotUrl");
    const savedGuid = localStorage.getItem("liveboardGuid");
    const savedInterval = localStorage.getItem("refreshInterval");
    const savedUnit = localStorage.getItem("intervalUnit");

    if (savedUrl) setThoughtSpotUrl(savedUrl);
    if (savedGuid) setLiveboardGuid(savedGuid);
    if (savedInterval) setRefreshInterval(savedInterval);
    if (savedUnit) setIntervalUnit(savedUnit);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Validate ThoughtSpot URL
    if (!thoughtSpotUrl.trim()) {
      newErrors.url = "ThoughtSpot Environment URL is required";
    } else if (!/^https?:\/\/.+/.test(thoughtSpotUrl.trim())) {
      newErrors.url = "Please enter a valid URL (starting with http:// or https://)";
    }

    // Validate Liveboard GUID
    if (!liveboardGuid.trim()) {
      newErrors.guid = "Liveboard GUID is required";
    }

    // Validate Refresh Interval
    if (!refreshInterval.trim()) {
      newErrors.interval = "Refresh interval is required";
    } else {
      const intervalNum = parseInt(refreshInterval, 10);
      if (isNaN(intervalNum) || intervalNum <= 0) {
        newErrors.interval = "Refresh interval must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Calculate refresh interval in milliseconds
    const intervalMs =
      parseInt(refreshInterval, 10) *
      (intervalUnit === "minutes" ? 60000 : 1000);

    // Save to localStorage
    localStorage.setItem("thoughtSpotUrl", thoughtSpotUrl.trim());
    localStorage.setItem("liveboardGuid", liveboardGuid.trim());
    localStorage.setItem("refreshInterval", refreshInterval);
    localStorage.setItem("intervalUnit", intervalUnit);
    localStorage.setItem("refreshIntervalMs", intervalMs.toString());

    // Initialize ThoughtSpot SDK
    init({
      thoughtSpotHost: thoughtSpotUrl.trim(),
      authType: AuthType.None,
    });

    // Navigate to dashboard
    history.push("/dashboard");
  };

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <div className="homepage-header">
          <h1 className="homepage-title">LiveSpot</h1>
          <p className="homepage-subtitle">
            Configure your ThoughtSpot Liveboard display
          </p>
        </div>

        <form onSubmit={handleSubmit} className="homepage-form">
          <div className="form-group">
            <label htmlFor="thoughtSpotUrl" className="form-label">
              ThoughtSpot Environment URL
            </label>
            <input
              id="thoughtSpotUrl"
              type="text"
              value={thoughtSpotUrl}
              onChange={(e) => setThoughtSpotUrl(e.target.value)}
              placeholder="https://your-thoughtspot-instance.com"
              className={`form-input ${errors.url ? "form-input-error" : ""}`}
            />
            {errors.url && <span className="error-message">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="liveboardGuid" className="form-label">
              Liveboard GUID
            </label>
            <input
              id="liveboardGuid"
              type="text"
              value={liveboardGuid}
              onChange={(e) => setLiveboardGuid(e.target.value)}
              placeholder="Enter your Liveboard GUID"
              className={`form-input ${errors.guid ? "form-input-error" : ""}`}
            />
            {errors.guid && <span className="error-message">{errors.guid}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="refreshInterval" className="form-label">
              Refresh Interval
            </label>
            <div className="interval-input-group">
              <input
                id="refreshInterval"
                type="number"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                placeholder="30"
                min="1"
                className={`form-input interval-input ${
                  errors.interval ? "form-input-error" : ""
                }`}
              />
              <select
                value={intervalUnit}
                onChange={(e) => setIntervalUnit(e.target.value)}
                className="form-select"
              >
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
            {errors.interval && (
              <span className="error-message">{errors.interval}</span>
            )}
            <p className="form-hint">
              How often should the liveboard automatically refresh?
            </p>
          </div>

          <button type="submit" className="submit-button">
            Load Dashboard
          </button>
        </form>

        <div className="homepage-footer">
          <p className="footer-text">© Built with ♥ by Aman Bhattarai</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

