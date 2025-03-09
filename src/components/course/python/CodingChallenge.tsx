
import { useState } from "react";
import { initialChallenge } from "./types/challenge.types";
import ChallengeHeader from "./challenges/ChallengeHeader";
import ChallengeCodeEditor from "./challenges/ChallengeCodeEditor";
import ChallengeHints from "./challenges/ChallengeHints";
import ChallengeTestCases from "./challenges/ChallengeTestCases";
import ChallengeOutput from "./challenges/ChallengeOutput";

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
        
        if (code.includes("sum(") && code.includes("len(") && code.includes("return")) {
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
            passed: index < 3 // Only first 3 test cases pass in this simulation
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
            testCases={challenge.testCases}
            totalCases={challenge.testCases.length}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
