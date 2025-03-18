import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MCQQuestion from "../python/mcq/MCQQuestion";
import MCQOptions from "../python/mcq/MCQOptions";
import MCQExplanation from "../python/mcq/MCQExplanation";
import MCQNavigation from "../python/mcq/MCQNavigation";
import MCQProgressBar from "../python/mcq/MCQProgressBar";
import { MCQItem as MCQItemType } from "../python/mcq/types";

// Rest of the code stays the same, just fixing the imports
type MCQItem = MCQItemType;

const dsaMCQData: MCQItem[] = [
  {
    id: "dsa-mcq-1",
    question: "What is the time complexity of binary search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(n²)"
    ],
    correctOptionIndex: 1,
    explanation: "Binary search has a time complexity of O(log n) because with each comparison, it eliminates half of the remaining elements. This logarithmic efficiency makes it much faster than linear search for large datasets."
  },
  {
    id: "dsa-mcq-2",
    question: "Which of the following data structures uses LIFO (Last In First Out) principle?",
    options: [
      "Queue",
      "Stack",
      "Linked List",
      "Binary Tree"
    ],
    correctOptionIndex: 1,
    explanation: "A stack follows the Last In First Out (LIFO) principle, where the last element added is the first one to be removed. Common operations include push (add to top) and pop (remove from top)."
  },
  {
    id: "dsa-mcq-3",
    question: "What is the worst-case time complexity of quicksort?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n log n)",
      "O(n²)"
    ],
    correctOptionIndex: 3,
    explanation: "The worst-case time complexity of quicksort is O(n²), which occurs when the pivot selection consistently results in highly unbalanced partitions. This happens when the array is already sorted or reverse sorted and the pivot is always the smallest or largest element."
  },
  {
    id: "dsa-mcq-4",
    question: "Which of these data structures allows for O(1) access to any element?",
    options: [
      "Array",
      "Linked List",
      "Binary Search Tree",
      "Hash Table"
    ],
    correctOptionIndex: 0,
    explanation: "Arrays provide O(1) constant time access to any element because they store elements in contiguous memory locations. This allows direct calculation of memory addresses using the index, enabling immediate access to any element regardless of the array size."
  },
  {
    id: "dsa-mcq-5",
    question: "What is the space complexity of depth-first search (DFS) for a graph?",
    options: [
      "O(1)",
      "O(V)",
      "O(E)",
      "O(V+E)"
    ],
    correctOptionIndex: 1,
    explanation: "The space complexity of DFS is O(V) where V is the number of vertices. This is because, in the worst case, the recursion stack or the explicit stack used in the implementation may contain all vertices of the graph. This happens when the graph resembles a single long path."
  }
];

const DSAMCQ = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = dsaMCQData[currentQuestionIndex];
  const totalQuestions = dsaMCQData.length;
  const isCorrect = selectedOptionIndex === currentQuestion.correctOptionIndex;
  const progress = (attemptedQuestions.size / totalQuestions) * 100;

  const handleOptionSelect = (index: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOptionIndex(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex !== null && !isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      setAttemptedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
      
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % totalQuestions);
  };

  const handlePreviousQuestion = () => {
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex((prev) => (prev - 1 + totalQuestions) % totalQuestions);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Data Structures & Algorithms Quiz</h2>
        <p className="text-muted-foreground">Test your knowledge of DSA concepts and complexity analysis</p>
      </div>

      <MCQProgressBar 
        progress={progress} 
        score={score} 
        totalQuestions={totalQuestions} 
      />

      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <MCQQuestion 
              questionNumber={currentQuestionIndex + 1} 
              totalQuestions={totalQuestions} 
              questionText={currentQuestion.question} 
            />

            <MCQOptions 
              options={currentQuestion.options} 
              selectedOptionIndex={selectedOptionIndex}
              correctOptionIndex={isAnswerSubmitted ? currentQuestion.correctOptionIndex : undefined}
              onOptionSelect={handleOptionSelect}
            />

            {isAnswerSubmitted && (
              <MCQExplanation isCorrect={isCorrect} explanation={currentQuestion.explanation} />
            )}

            <div className="flex justify-between pt-2">
              {!isAnswerSubmitted ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={selectedOptionIndex === null}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              ) : (
                <MCQNavigation 
                  onNext={handleNextQuestion}
                  onPrevious={handlePreviousQuestion}
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={totalQuestions}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DSAMCQ;
