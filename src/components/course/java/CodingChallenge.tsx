
import { useState } from "react";
import { Challenge, ChallengeDifficulty, TestCase } from "@/types/course.types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayIcon, LightbulbIcon, Code2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ChallengeHeader from "../python/challenges/ChallengeHeader";
import ChallengeCodeEditor from "../python/challenges/ChallengeCodeEditor";
import ChallengeTestCases from "../python/challenges/ChallengeTestCases";
import ChallengeHints from "../python/challenges/ChallengeHints";
import ChallengeOutput from "../python/challenges/ChallengeOutput";

const challenge: Challenge = {
  id: "java-challenge-1",
  title: "Palindrome Checker",
  difficulty: "easy",
  description: "Write a Java function that checks if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward, ignoring spaces, punctuation, and capitalization.\n\nFor example, 'racecar' and 'A man, a plan, a canal, Panama' are both palindromes.",
  starterCode: `public class PalindromeChecker {
    /**
     * Check if the given string is a palindrome.
     * Ignore spaces, punctuation, and capitalization.
     * 
     * @param str the string to check
     * @return true if the string is a palindrome, false otherwise
     */
    public static boolean isPalindrome(String str) {
        // Your code here
        return false;
    }
    
    // Test the function - do not modify
    public static void main(String[] args) {
        String[] testCases = {
            "racecar",
            "A man, a plan, a canal, Panama",
            "hello",
            "Madam, I'm Adam"
        };
        
        for (String test : testCases) {
            boolean result = isPalindrome(test);
            System.out.println("Is '" + test + "' a palindrome? " + result);
        }
    }
}`,
  hints: [
    "Remove all non-alphanumeric characters and convert to lowercase first",
    "You can use a regular expression to remove unwanted characters",
    "Compare characters from both ends of the string moving inward",
    "You can also reverse the string and compare it with the original"
  ],
  testCases: [
    {
      id: "test1",
      input: "racecar",
      output: "true",
      explanation: "Basic test case, 'racecar' reads the same forward and backward"
    },
    {
      id: "test2",
      input: "A man, a plan, a canal, Panama",
      output: "true",
      explanation: "Test case with spaces, punctuation, and mixed case"
    },
    {
      id: "test3",
      input: "hello",
      output: "false",
      explanation: "Not a palindrome"
    }
  ]
};

const JavaCodingChallenge = () => {
  const [code, setCode] = useState(challenge.starterCode);
  const [activeTab, setActiveTab] = useState("description");
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [testCases, setTestCases] = useState(challenge.testCases.map(tc => ({
    ...tc,
    passed: false
  })));
  // Add missing state for hints
  const [currentHint, setCurrentHint] = useState(0);

  const handleRunCode = () => {
    // Simulating code execution and test results
    setRunOutput("Compiling Java code...");
    
    setTimeout(() => {
      // Simulated test results
      const updatedTestCases = testCases.map(tc => ({
        ...tc,
        passed: Math.random() > 0.3 // Randomly pass/fail for demo
      }));
      
      const allPassed = updatedTestCases.every(tc => tc.passed);
      setTestCases(updatedTestCases);
      setAllTestsPassed(allPassed);
      
      if (allPassed) {
        setRunOutput("All tests passed! Your palindrome checker works correctly.");
      } else {
        setRunOutput("Some tests failed. Check your implementation and try again.");
      }
    }, 1500);
  };

  const handleNextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  return (
    <div className="space-y-6">
      <ChallengeHeader 
        challenge={challenge}
        solved={false}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-2">
          <CardContent className="p-6 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="description" className="flex items-center gap-2">
                  <Code2Icon className="h-4 w-4" />
                  Problem
                </TabsTrigger>
                <TabsTrigger value="hints" className="flex items-center gap-2">
                  <LightbulbIcon className="h-4 w-4" />
                  Hints
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <div className="prose dark:prose-invert">
                  <p className="whitespace-pre-line">{challenge.description}</p>
                </div>
                
                <Separator />
                
                <ChallengeTestCases 
                  testCases={testCases} 
                  totalCases={testCases.length}
                />
              </TabsContent>
              
              <TabsContent value="hints">
                <ChallengeHints 
                  hints={challenge.hints}
                  currentHint={currentHint}
                  onNextHint={handleNextHint}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Your Solution</h3>
                <Button 
                  onClick={handleRunCode}
                  className="gap-2"
                >
                  <PlayIcon className="h-4 w-4" />
                  Run Tests
                </Button>
              </div>
              
              <ChallengeCodeEditor 
                code={code} 
                onCodeChange={setCode}
                onRun={handleRunCode}
                onToggleHints={() => setActiveTab(activeTab === "hints" ? "description" : "hints")}
                showHints={activeTab === "hints"}
                running={false}
              />
            </CardContent>
          </Card>
          
          {runOutput && (
            <ChallengeOutput 
              runOutput={runOutput}
              allTestsPassed={allTestsPassed}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaCodingChallenge;
