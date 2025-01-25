import React, { useState } from "react";

interface SidePanelProps {
  selectedOption: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedOption }) => {
  return (
    <div className="w-[20%] bg-[#791e3389] h-full pt-2">
      <ul className="space-y-4">
        <li
          className={`cursor-pointer p-2 ${
            selectedOption === "overview" ? "bg-[#d635d1]" : ""
          }`}
        >
          Overview
        </li>
        <li
          className={`cursor-pointer p-2 ${
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