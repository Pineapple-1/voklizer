import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ClockSvg = ({ isRecording }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      setPercentage(0);
      interval = setInterval(() => {
        setPercentage(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(prev + 1.66, 100);
        });
      }, 1000);
    } else {
      setPercentage(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const angle = percentage * 3.6;

  const getCoordinatesForAngle = (angle) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: 13.5176 + 11.5 * Math.cos(radians),
      y: 18.7178 + 11.5 * Math.sin(radians),
    };
  };

  const end = getCoordinatesForAngle(angle);
  const largeArcFlag = angle <= 180 ? 0 : 1;

  return (
    <div>
      <svg
        width="28"
        height="33"
        viewBox="0 0 28 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7282 0.929021V1.69787C17.7282 2.21501 17.3126 2.63605 16.8011 2.63605H16.4769V4.13713C13.2939 3.47354 10.5584 4.13713 10.5584 4.13713V2.63605H10.2341C9.72264 2.63605 9.30707 2.21959 9.30707 1.69787V0.929021C9.30707 0.411879 9.72264 -3.8147e-06 10.2341 -3.8147e-06H16.8011C17.3126 -3.8147e-06 17.7282 0.411879 17.7282 0.929021Z"
          fill="#8532D8"
        />
        <path
          d="M25.2679 6.43911L21.103 3.51931C20.8473 3.34083 20.6738 3.45067 20.587 3.55135L20.5139 3.65661L19.4727 5.14854C19.4727 5.14854 22.0986 6.17825 24.3272 8.54886L25.373 7.04778C25.6105 6.69997 25.2999 6.46199 25.2679 6.43911Z"
          fill="#8532D8"
        />

        <circle cx="13.5176" cy="18.7178" r="11.5" fill="#f5f5f5" />

        {percentage > 0 && (
          <motion.path
            d={
              percentage >= 100
                ? "M13.5176,18.7178 m-11.5,0 a11.5,11.5 0 1,0 23,0 a11.5,11.5 0 1,0 -23,0"
                : `M13.5176,18.7178 L13.5176,7.2178 A11.5,11.5 0 ${largeArcFlag},1 ${end.x},${end.y} Z`
            }
            fill="#8532D8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <circle
          cx="13.5176"
          cy="18.7178"
          r="11.5"
          fill="none"
          stroke="#8532D8"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default ClockSvg;