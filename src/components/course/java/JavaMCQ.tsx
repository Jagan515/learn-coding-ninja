
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MCQQuestion } from "../python/mcq/MCQQuestion";
import { MCQOptions } from "../python/mcq/MCQOptions";
import { MCQExplanation } from "../python/mcq/MCQExplanation";
import { MCQNavigation } from "../python/mcq/MCQNavigation";
import { MCQProgressBar } from "../python/mcq/MCQProgressBar";
import { MCQItem } from "../python/mcq/types";

const javaMCQData: MCQItem[] = [
  {
    id: "java-mcq-1",
    question: "In Java, which keyword is used to inherit a class?",
    options: [
      "implements",
      "extends",
      "inherits",
      "using"
    ],
    correctOptionIndex: 1,
    explanation: "In Java, the 'extends' keyword is used to inherit a class. For example, 'class Dog extends Animal' means the Dog class inherits from the Animal class. The 'implements' keyword is used to implement interfaces, not to inherit classes."
  },
  {
    id: "java-mcq-2",
    question: "Which of the following is NOT a valid access modifier in Java?",
    options: [
      "public",
      "protected",
      "private",
      "friend"
    ],
    correctOptionIndex: 3,
    explanation: "Java has three main access modifiers: public, protected, and private. It also has a default (package-private) access when no modifier is specified. 'friend' is not a valid access modifier in Java (it exists in C++ but not in Java)."
  },
  {
    id: "java-mcq-3",
    question: "What is the output of: System.out.println(5 + 8 + \"Java\");",
    options: [
      "5 + 8 + Java",
      "13Java",
      "Java13",
      "Compilation error"
    ],
    correctOptionIndex: 1,
    explanation: "In this expression, 5 and 8 are added first because they are numbers and the addition operator is evaluated from left to right, resulting in 13. Then, the string \"Java\" is concatenated to the result, giving \"13Java\"."
  },
  {
    id: "java-mcq-4",
    question: "Which collection class in Java is synchronized?",
    options: [
      "ArrayList",
      "LinkedList",
      "Vector",
      "HashMap"
    ],
    correctOptionIndex: 2,
    explanation: "Vector is a synchronized collection class in Java, which means it is thread-safe. ArrayList and LinkedList are not synchronized by default. HashMap is also not synchronized."
  },
  {
    id: "java-mcq-5",
    question: "What does the 'final' keyword do when applied to a class?",
    options: [
      "The class can be instantiated only once",
      "The class cannot be extended (inherited)",
      "The class's methods cannot be overridden",
      "The class will be garbage collected last"
    ],
    correctOptionIndex: 1,
    explanation: "When the 'final' keyword is applied to a class, it means that the class cannot be extended or inherited by other classes. This is often used for security reasons or to ensure that the behavior of the class remains consistent."
  }
];

const JavaMCQ = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = javaMCQData[currentQuestionIndex];
  const totalQuestions = javaMCQData.length;
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
        <h2 className="text-2xl font-bold tracking-tight">Java Programming Quiz</h2>
        <p className="text-muted-foreground">Test your knowledge of Java programming concepts</p>
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

export default JavaMCQ;
