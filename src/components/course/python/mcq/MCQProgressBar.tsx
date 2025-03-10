
import React from "react";

interface MCQProgressBarProps {
  progress: number;
}

const MCQProgressBar: React.FC<MCQProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default MCQProgressBar;
