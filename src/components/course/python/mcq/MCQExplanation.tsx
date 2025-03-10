
import React from "react";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface MCQExplanationProps {
  explanation: string;
  show: boolean;
}

const MCQExplanation: React.FC<MCQExplanationProps> = ({ explanation, show }) => {
  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg"
    >
      <div className="flex gap-2">
        <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800">Explanation</h4>
          <p className="text-blue-700">{explanation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MCQExplanation;
