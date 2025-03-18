
import React from "react";
import { HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface MCQExplanationProps {
  explanation: string;
  show?: boolean;
  isCorrect?: boolean; 
}

const MCQExplanation: React.FC<MCQExplanationProps> = ({ explanation, show = true, isCorrect }) => {
  if (!show) return null;

  const bgClass = isCorrect !== undefined 
    ? isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
    : "bg-blue-50 border-blue-100";
    
  const textClass = isCorrect !== undefined
    ? isCorrect ? "text-green-800" : "text-red-800"
    : "text-blue-800";
    
  const iconClass = isCorrect !== undefined
    ? isCorrect ? "text-green-600" : "text-red-600"
    : "text-blue-600";
    
  const Icon = isCorrect !== undefined
    ? isCorrect ? CheckCircle : XCircle
    : HelpCircle;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-4 p-4 ${bgClass} rounded-lg`}
    >
      <div className="flex gap-2">
        <Icon className={`h-5 w-5 ${iconClass} flex-shrink-0 mt-0.5`} />
        <div>
          <h4 className={`font-medium ${textClass}`}>
            {isCorrect !== undefined 
              ? isCorrect ? "Correct!" : "Incorrect"
              : "Explanation"}
          </h4>
          <p className={isCorrect !== undefined
              ? isCorrect ? "text-green-700" : "text-red-700"
              : "text-blue-700"
          }>{explanation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MCQExplanation;
