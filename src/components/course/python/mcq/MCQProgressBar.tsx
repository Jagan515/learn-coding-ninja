
import React from "react";

interface MCQProgressBarProps {
  progress: number;
  score?: number;
  totalQuestions?: number;
}

const MCQProgressBar: React.FC<MCQProgressBarProps> = ({ 
  progress, 
  score, 
  totalQuestions 
}) => {
  return (
    <div className="space-y-2">
      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {score !== undefined && totalQuestions !== undefined && (
        <div className="flex justify-end">
          <p className="text-sm text-muted-foreground">
            Score: {score}/{totalQuestions}
          </p>
        </div>
      )}
    </div>
  );
};

export default MCQProgressBar;
