
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { TestCase } from "../types/challenge.types";
import { motion } from "framer-motion";

interface ChallengeTestCasesProps {
  testCases: TestCase[];
  totalCases: number;
}

const ChallengeTestCases = ({ testCases, totalCases }: ChallengeTestCasesProps) => {
  const passedTestCount = testCases.filter(tc => tc.passed).length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Test Cases</h3>
      
      <motion.div 
        className="p-4 bg-blue-50 border border-blue-100 rounded-lg shadow-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="font-medium text-blue-800 mb-2">Passing Requirements</h4>
        <p className="text-blue-700 text-sm mb-3">
          You need to pass all {totalCases}/{totalCases} test cases to complete this challenge.
        </p>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Your Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {passedTestCount}/{totalCases} tests passing
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-blue-200">
            <motion.div 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${(passedTestCount / totalCases) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
      
      <div className="space-y-3">
        {testCases.map((testCase, index) => (
          <motion.div 
            key={testCase.id}
            className={`p-4 rounded-lg border shadow-sm ${
              testCase.passed 
                ? "bg-green-50 border-green-100" 
                : "bg-card"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                Test Case #{index + 1}
              </span>
              {testCase.passed ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Passed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-100 px-2 py-1 rounded-full text-xs font-medium">
                  {index < 3 ? <XCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                  <span>{index < 3 ? "Failed" : "Not Run"}</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="bg-white bg-opacity-50 p-2 rounded border border-slate-100">
                <span className="font-medium text-slate-600">Input:</span>
                <span className="ml-2 font-mono">{testCase.input}</span>
              </div>
              <div className="bg-white bg-opacity-50 p-2 rounded border border-slate-100">
                <span className="font-medium text-slate-600">Expected:</span>
                <span className="ml-2 font-mono">{testCase.output}</span>
              </div>
              <div className="p-2 rounded">
                <span className="font-medium text-slate-600">Explanation:</span>
                <span className="ml-2 text-slate-500">{testCase.explanation}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeTestCases;
