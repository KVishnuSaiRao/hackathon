import React, { useState } from "react";

interface SidePanelProps {
  selectedOption: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedOption }) => {
  return (
<div className="w-[20%] bg-gradient-to-b from-red-700 to-indigo-700 h-full pt-2">
<ul className="space-y-4">
        <li
          className={`cursor-pointer p-2 text-white ${
            selectedOption === "overview" ? "bg-[#3061bd84]" : ""
          }`}
        >
          Overview
        </li>
        <li
          className={`cursor-pointer p-2 text-white border-spacing-1 border-black ${
            selectedOption === "analysis" ? "bg-gray-400" : ""
          }`}
        >
          Analysis
        </li>
      </ul>
    </div>
  );
};

export default SidePanel;