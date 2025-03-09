
export interface TestCase {
  id: string;
  input: string;
  output: string;
  explanation: string;
  passed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
}

export const initialChallenge: Challenge = {
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
