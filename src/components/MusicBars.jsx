import React from 'react';
import './MusicBar.css'; 

const MusicBars = ({isAnimating}) => {

 return (
    <div className="music">
      {Array.from({ length: 24 }).map((_, index) => (
        <div key={index} className={`bar ${isAnimating&&'animate' }`}></div>
      ))}
    </div>
 );
};

export default MusicBars;
