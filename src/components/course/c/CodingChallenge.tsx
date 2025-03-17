
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
  id: "c-challenge-1",
  title: "Reverse an Array",
  difficulty: "medium",
  description: "Write a C function that reverses an array of integers. The function should take an integer array and its size as parameters, and modify the array in-place to reverse the order of its elements.\n\nFor example, if the input array is [1, 2, 3, 4, 5], after your function runs, the array should be [5, 4, 3, 2, 1].",
  starterCode: `#include <stdio.h>

// Complete this function to reverse the array in-place
void reverseArray(int arr[], int size) {
    // Your code here
}

// Test function - do not modify
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    
    reverseArray(arr, size);
    
    printf("\\nReversed array: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    
    return 0;
}`,
  hints: [
    "Think about swapping elements from both ends of the array and moving inward",
    "You'll need a temporary variable to hold one value during the swap",
    "The loop only needs to go halfway through the array",
    "Be careful with the indices to avoid out-of-bounds access"
  ],
  testCases: [
    {
      id: "test1",
      input: "[1, 2, 3, 4, 5]",
      output: "[5, 4, 3, 2, 1]",
      explanation: "Basic test case with odd number of elements"
    },
    {
      id: "test2",
      input: "[10, 20, 30, 40]",
      output: "[40, 30, 20, 10]",
      explanation: "Test with even number of elements"
    },
    {
      id: "test3",
      input: "[42]",
      output: "[42]",
      explanation: "Edge case with a single element array"
    }
  ]
};

const CCodingChallenge = () => {
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
    setRunOutput("Compiling C code...");
    
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
        setRunOutput("All tests passed! Your array reversal function works correctly.");
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
                language="c"
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

export default CCodingChallenge;
