
import React from "react";
import { MCQuestion } from "./types";

interface MCQQuestionProps {
  question?: MCQuestion;
  currentIndex?: number;
  totalQuestions?: number;
  questionNumber?: number;
  questionText?: string;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ 
  question, 
  currentIndex, 
  totalQuestions,
  questionNumber,
  questionText
}) => {
  // Support both new and old prop patterns
  const displayNumber = questionNumber || (currentIndex !== undefined ? currentIndex + 1 : 1);
  const displayTotal = totalQuestions || 1;
  const displayText = questionText || (question ? question.question : "");
  const codeSnippet = question?.code;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">
        Question {displayNumber} of {displayTotal}
      </h3>
      <p className="text-lg">{displayText}</p>
      
      {codeSnippet && (
        <pre className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
          {codeSnippet}
        </pre>
      )}
    </div>
  );
};

export default MCQQuestion;
