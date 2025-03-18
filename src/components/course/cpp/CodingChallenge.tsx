
import { useState } from "react";
import { Challenge, ChallengeDifficulty, TestCase } from "@/types/course.types";
import { Card, CardContent } from "@/components/ui/card";
import ChallengeHeader from "../python/challenges/ChallengeHeader";
import ChallengeCodeEditor from "../python/challenges/ChallengeCodeEditor";
import ChallengeHints from "../python/challenges/ChallengeHints";
import ChallengeTestCases from "../python/challenges/ChallengeTestCases";
import ChallengeOutput from "../python/challenges/ChallengeOutput";

const initialChallenge: Challenge = {
  id: "cpp-sum-array",
  title: "Sum of Array Elements",
  difficulty: "easy" as ChallengeDifficulty,
  description: "Write a function that calculates the sum of all elements in an integer array. The function should take a vector of integers as input and return the sum of all elements.",
  starterCode: `#include <iostream>
#include <vector>

// Complete this function
int sumArray(const std::vector<int>& arr) {
    // Your code here
    
}

// Do not modify the main function
int main() {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    int result = sumArray(arr);
    std::cout << "Sum: " << result << std::endl;
    return 0;
}`,
  hints: [
    "You'll need to iterate through each element in the vector.",
    "Consider using a for loop or range-based for loop in C++11 and later.",
    "Remember to initialize your sum variable before adding to it."
  ],
  testCases: [
    {
      id: "test1",
      input: "[1, 2, 3, 4, 5]",
      output: "15",
      explanation: "Sum of [1, 2, 3, 4, 5]"
    },
    {
      id: "test2",
      input: "[]",
      output: "0",
      explanation: "Sum of empty array []"
    },
    {
      id: "test3",
      input: "[-1, -2, -3, -4, -5]",
      output: "-15",
      explanation: "Sum of [-1, -2, -3, -4, -5]"
    },
    {
      id: "test4",
      input: "[10, 20, 30, 40, 50]",
      output: "150",
      explanation: "Sum of [10, 20, 30, 40, 50]"
    },
    {
      id: "test5",
      input: "[5]",
      output: "5",
      explanation: "Sum of [5]"
    }
  ]
};

const CodingChallenge = () => {
  const [code, setCode] = useState(initialChallenge.starterCode);
  const [challenge, setChallenge] = useState(initialChallenge);
  const [running, setRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const runCode = () => {
    setRunning(true);
    
    // Simulate code execution and test case checking
    setTimeout(() => {
      // This would be replaced by actual execution logic or API call to Claude
      const simulateTestResults = () => {
        // Sample solution for demonstration
        // In a real app, this would be evaluated on the server
        const updated = { ...challenge };
        
        if (code.includes("for") && (code.includes("sum +=") || code.includes("sum=sum+"))) {
          // Mark all test cases as passed (simplified for demo)
          updated.testCases = updated.testCases.map(tc => ({
            ...tc,
            passed: true
          }));
          
          setRunOutput("All test cases passed!");
          setSolved(true);
        } else {
          // Show some failures for demonstration
          updated.testCases = updated.testCases.map((tc, index) => ({
            ...tc,
            passed: index < 2 // Only first 2 test cases pass in this simulation
          }));
          
          setRunOutput("Some test cases failed. Check your implementation.");
          setSolved(false);
        }
        
        setChallenge(updated);
        setRunning(false);
      };
      
      simulateTestResults();
    }, 1500);
  };

  const handleNextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const passedTestCount = challenge.testCases.filter(tc => tc.passed).length;
  const allTestsPassed = passedTestCount === challenge.testCases.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <ChallengeHeader 
        challenge={challenge} 
        solved={solved} 
      />

      <div className="p-4 bg-card rounded-lg border">
        <p className="text-muted-foreground">{challenge.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ChallengeCodeEditor 
            code={code}
            onCodeChange={handleCodeChange}
            onRun={runCode}
            onToggleHints={() => setShowHints(!showHints)}
            showHints={showHints}
            running={running}
          />
          
          {showHints && (
            <ChallengeHints 
              hints={challenge.hints}
              currentHint={currentHint}
              onNextHint={handleNextHint}
            />
          )}
          
          <ChallengeOutput 
            runOutput={runOutput}
            allTestsPassed={allTestsPassed}
          />
        </div>
        
        <div>
          <ChallengeTestCases 
            testCases={challenge.testCases.map(tc => ({
              ...tc,
              passed: tc.passed || false
            }))}
            totalCases={challenge.testCases.length}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
