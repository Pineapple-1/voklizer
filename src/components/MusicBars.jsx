import React from "react";
import "./MusicBar.css";

export const MusicBars = ({ isAnimating }) => {
  return (
    <div className="music">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className={`bar ${isAnimating && "animate"}`}></div>
      ))}
    </div>
  );
};

export const MusicBarsSmall = ({ isAnimating }) => {
  return (
    <div className="music-sm ">
      {Array.from({ length: 14 }).map((_, index) => (
        <div key={index} className={`bar-sm ${isAnimating && "animate"}`}></div>
      ))}
    </div>
  );
};
