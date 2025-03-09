
import { CheckCircle } from "lucide-react";
import { TestCase } from "../types/challenge.types";

interface ChallengeTestCasesProps {
  testCases: TestCase[];
  totalCases: number;
}

const ChallengeTestCases = ({ testCases, totalCases }: ChallengeTestCasesProps) => {
  const passedTestCount = testCases.filter(tc => tc.passed).length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Test Cases</h3>
      <div className="space-y-3">
        {testCases.map((testCase) => (
          <div 
            key={testCase.id}
            className={`p-3 rounded-lg border ${
              testCase.passed 
                ? "bg-green-50 border-green-100" 
                : "bg-card"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm">
                Input: {testCase.input}
              </span>
              {testCase.passed && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Expected: {testCase.output}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h4 className="font-medium text-blue-800">Passing Requirements</h4>
        <p className="text-blue-700 text-sm mt-1">
          You need to pass all {totalCases}/{totalCases} test cases to complete this challenge.
        </p>
        <div className="mt-3 w-full bg-blue-200 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${(passedTestCount / totalCases) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-blue-700">
          {passedTestCount}/{totalCases} tests passing
        </div>
      </div>
    </div>
  );
};

export default ChallengeTestCases;
