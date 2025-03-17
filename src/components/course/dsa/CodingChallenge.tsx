
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
  id: "dsa-challenge-1",
  title: "Two Sum Problem",
  difficulty: "easy",
  description: "Given an array of integers and a target sum, return the indices of two numbers that add up to the target.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)",
  starterCode: `function twoSum(nums, target) {
  // Your solution here
  // Return the indices of the two numbers that add up to the target
}

// Example usage:
// twoSum([2, 7, 11, 15], 9) should return [0, 1]
// twoSum([3, 2, 4], 6) should return [1, 2]
// twoSum([3, 3], 6) should return [0, 1]`,
  hints: [
    "A naive approach would be to use two nested loops to check every pair of numbers",
    "Can you think of a more efficient approach using a hash map (object)?",
    "For each number, check if the complement (target - number) exists in the hash map",
    "If it doesn't exist, add the current number to the hash map with its index"
  ],
  testCases: [
    {
      id: "test1",
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explanation: "2 + 7 = 9, so return the indices [0, 1]"
    },
    {
      id: "test2",
      input: "nums = [3, 2, 4], target = 6",
      output: "[1, 2]",
      explanation: "2 + 4 = 6, so return the indices [1, 2]"
    },
    {
      id: "test3",
      input: "nums = [3, 3], target = 6",
      output: "[0, 1]",
      explanation: "3 + 3 = 6, so return the indices [0, 1]"
    }
  ]
};

const DSACodingChallenge = () => {
  const [code, setCode] = useState(challenge.starterCode);
  const [activeTab, setActiveTab] = useState("description");
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [testCases, setTestCases] = useState(challenge.testCases.map(tc => ({
    ...tc,
    passed: false
  })));

  const handleRunCode = () => {
    // Simulating code execution and test results
    setRunOutput("Executing JavaScript solution...");
    
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
        setRunOutput("All tests passed! Your Two Sum solution works correctly.");
      } else {
        setRunOutput("Some tests failed. Check your implementation and try again.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <ChallengeHeader 
        title={challenge.title} 
        difficulty={challenge.difficulty as ChallengeDifficulty} 
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
                
                <ChallengeTestCases testCases={testCases} />
              </TabsContent>
              
              <TabsContent value="hints">
                <ChallengeHints hints={challenge.hints} />
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
                language="javascript"
                onChange={setCode}
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

export default DSACodingChallenge;
