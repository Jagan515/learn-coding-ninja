
import React from "react";
import { MCQuestion } from "./types";

interface MCQQuestionProps {
  question: MCQuestion;
  currentIndex: number;
  totalQuestions: number;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ 
  question, 
  currentIndex, 
  totalQuestions 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">
        Question {currentIndex + 1} of {totalQuestions}
      </h3>
      <p className="text-lg">{question.question}</p>
      
      {question.code && (
        <pre className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
          {question.code}
        </pre>
      )}
    </div>
  );
};

export default MCQQuestion;
