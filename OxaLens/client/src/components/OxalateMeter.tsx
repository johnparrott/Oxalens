import React from "react";
import { OxalateLevel } from "@/lib/types";

interface OxalateMeterProps {
  level: OxalateLevel;
  content: number; // in mg
}

const OxalateMeter: React.FC<OxalateMeterProps> = ({ level, content }) => {
  // Calculate the percentage for the circle progress
  const getPercentage = () => {
    switch (level) {
      case "low":
        return 0.2;
      case "medium":
        return 0.5;
      case "high":
        return 0.8;
      default:
        return 0;
    }
  };

  const getColor = () => {
    switch (level) {
      case "low":
        return "#4CAF50"; // green
      case "medium":
        return "#FFA000"; // amber
      case "high":
        return "#F44336"; // red
      default:
        return "#e6e6e6"; // gray
    }
  };

  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - getPercentage());
  const color = getColor();

  return (
    <div className="oxalate-meter mb-4 sm:mb-0 sm:mr-6 w-20 h-20 relative">
      <svg viewBox="0 0 100 100">
        <circle className="bg" cx="50" cy="50" r="45" fill="none" strokeWidth="8" stroke="#e6e6e6" />
        <circle
          className="progress"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold capitalize">{level}</span>
        <span className="text-xs">{content} mg</span>
      </div>
    </div>
  );
};

export default OxalateMeter;
