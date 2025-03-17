
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MCQQuestion } from "../python/mcq/MCQQuestion";
import { MCQOptions } from "../python/mcq/MCQOptions";
import { MCQExplanation } from "../python/mcq/MCQExplanation";
import { MCQNavigation } from "../python/mcq/MCQNavigation";
import { MCQProgressBar } from "../python/mcq/MCQProgressBar";
import { MCQItem } from "../python/mcq/types";

const cMCQData: MCQItem[] = [
  {
    id: "c-mcq-1",
    question: "Which of the following is not a basic data type in C?",
    options: [
      "int",
      "float",
      "boolean",
      "char"
    ],
    correctOptionIndex: 2,
    explanation: "C does not have a built-in boolean data type. Instead, it uses integers for boolean operations where 0 represents false and any non-zero value represents true. The boolean type was introduced in C99 through the <stdbool.h> header."
  },
  {
    id: "c-mcq-2",
    question: "Which operator is used for pointer declaration in C?",
    options: [
      "&",
      "*",
      "#",
      "$"
    ],
    correctOptionIndex: 1,
    explanation: "The asterisk (*) is used to declare a pointer variable in C. For example, int *p; declares a pointer to an integer. The ampersand (&) is used to get the address of a variable."
  },
  {
    id: "c-mcq-3",
    question: "What is the correct way to access the value at a memory address stored in a pointer variable 'ptr'?",
    options: [
      "ptr",
      "&ptr",
      "*ptr",
      "**ptr"
    ],
    correctOptionIndex: 2,
    explanation: "The asterisk (*) operator is used as a dereference operator when placed before a pointer variable. It gives the value stored at the memory address contained in the pointer. *ptr accesses the value at the address stored in ptr."
  },
  {
    id: "c-mcq-4",
    question: "Which of the following is the correct syntax for a function that doesn't return any value in C?",
    options: [
      "null function()",
      "void function()",
      "int function()",
      "empty function()"
    ],
    correctOptionIndex: 1,
    explanation: "In C, a function that doesn't return any value is declared with the 'void' return type. The 'void' keyword indicates that the function performs an action but doesn't return any value to the calling function."
  },
  {
    id: "c-mcq-5",
    question: "What does the 'sizeof' operator in C return?",
    options: [
      "The memory address of a variable",
      "The number of elements in an array",
      "The size of a variable or data type in bytes",
      "The length of a string"
    ],
    correctOptionIndex: 2,
    explanation: "The 'sizeof' operator in C returns the size of a variable or data type in bytes. It is a compile-time operator, meaning it determines the size during compilation rather than at runtime."
  }
];

const CMCQ = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = cMCQData[currentQuestionIndex];
  const totalQuestions = cMCQData.length;
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
        <h2 className="text-2xl font-bold tracking-tight">C Programming Quiz</h2>
        <p className="text-muted-foreground">Test your knowledge of C programming concepts</p>
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

export default CMCQ;
