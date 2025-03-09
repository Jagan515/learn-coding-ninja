
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Play, AlertCircle, Trophy, Info } from "lucide-react";

interface TestCase {
  id: string;
  input: string;
  output: string;
  explanation: string;
  passed: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
}

const initialChallenge: Challenge = {
  id: "ch1",
  title: "Create a Function to Find the Average",
  description: "Write a function called `find_average` that takes a list of numbers as an argument and returns the average (mean) of those numbers.",
  difficulty: "easy",
  starterCode: 
`def find_average(numbers):
    # Your code here
    pass

# Example usage (don't modify this)
# find_average([1, 2, 3, 4, 5]) should return 3.0
`,
  testCases: [
    {
      id: "tc1",
      input: "[1, 2, 3, 4, 5]",
      output: "3.0",
      explanation: "The average of [1, 2, 3, 4, 5] is 15/5 = 3.0",
      passed: false
    },
    {
      id: "tc2",
      input: "[10, 20, 30, 40]",
      output: "25.0",
      explanation: "The average of [10, 20, 30, 40] is 100/4 = 25.0",
      passed: false
    },
    {
      id: "tc3",
      input: "[2.5, 3.5, 4.5]",
      output: "3.5",
      explanation: "The average of [2.5, 3.5, 4.5] is 10.5/3 = 3.5",
      passed: false
    },
    {
      id: "tc4",
      input: "[-10, -5, 0, 5, 10]",
      output: "0.0",
      explanation: "The average of [-10, -5, 0, 5, 10] is 0/5 = 0.0",
      passed: false
    },
    {
      id: "tc5",
      input: "[100]",
      output: "100.0",
      explanation: "The average of [100] is 100/1 = 100.0",
      passed: false
    },
    {
      id: "tc6",
      input: "[]",
      output: "0.0",
      explanation: "The average of an empty list should return 0.0",
      passed: false
    }
  ],
  hints: [
    "Remember to handle the case when the list is empty.",
    "You need to sum all elements in the list and divide by the length of the list.",
    "Don't forget to convert the result to a float to ensure precise division."
  ]
};

const CodingChallenge = () => {
  const [code, setCode] = useState(initialChallenge.starterCode);
  const [challenge, setChallenge] = useState<Challenge>(initialChallenge);
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "hard": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  const passedTestCount = challenge.testCases.filter(tc => tc.passed).length;
  const allTestsPassed = passedTestCount === challenge.testCases.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{challenge.title}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Python
            </Badge>
          </div>
        </div>
        {solved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full border border-green-200">
            <Trophy className="h-4 w-4" />
            <span className="font-medium">Challenge Completed!</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-card rounded-lg border">
        <p className="text-muted-foreground">{challenge.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium">Your Solution</h3>
          <div className="border rounded-lg overflow-hidden">
            <CodeMirror
              value={code}
              height="300px"
              theme={vscodeDark}
              extensions={[python()]}
              onChange={handleCodeChange}
              className="text-sm"
            />
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2"
            >
              <Info className="h-4 w-4" />
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
            
            <Button 
              onClick={runCode}
              disabled={running}
              className="flex items-center gap-2"
            >
              {running ? "Running..." : "Run Code"}
              <Play className="h-4 w-4" />
            </Button>
          </div>
          
          {showHints && (
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <h4 className="font-medium text-amber-800 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Hint {currentHint + 1} of {challenge.hints.length}
              </h4>
              <p className="text-amber-700 mt-1">{challenge.hints[currentHint]}</p>
              {currentHint < challenge.hints.length - 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleNextHint}
                  className="mt-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100"
                >
                  Next hint
                </Button>
              )}
            </div>
          )}
          
          {runOutput && (
            <Alert className={allTestsPassed ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}>
              <AlertDescription className="flex items-start gap-2">
                {allTestsPassed ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                )}
                <span className={allTestsPassed ? "text-green-700" : "text-amber-700"}>
                  {runOutput}
                </span>
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Test Cases</h3>
          <div className="space-y-3">
            {challenge.testCases.map((testCase) => (
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
              You need to pass all 6/6 test cases to complete this challenge.
            </p>
            <div className="mt-3 w-full bg-blue-200 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${(passedTestCount / challenge.testCases.length) * 100}%` }}
              />
            </div>
            <div className="mt-1 text-right text-xs text-blue-700">
              {passedTestCount}/{challenge.testCases.length} tests passing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;
