import React from "react";
import "./Header.css";

const Header = ({ onBack, lastRefresh, isHovered, onHoverChange }) => {
  const formatLastRefresh = () => {
    if (!lastRefresh) return "Loading...";
    const now = new Date();
    const diff = Math.floor((now - lastRefresh) / 1000);
    
    if (diff < 60) {
      return `${diff} second${diff !== 1 ? "s" : ""} ago`;
    } else {
      const minutes = Math.floor(diff / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div 
      className={`header-wrapper ${isHovered ? "header-hovered" : ""}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">LiveSpot</h1>
          </div>
          <div className="header-right">
            {lastRefresh && (
              <div className="refresh-indicator">
                <span className="refresh-label">Last refreshed:</span>
                <span className="refresh-time">{formatLastRefresh()}</span>
              </div>
            )}
            <button onClick={onBack} className="back-button">
              ← Back to Config
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

