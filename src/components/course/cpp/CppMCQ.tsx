
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrainCircuit, Check, X, HelpCircle, ArrowRight, ArrowLeft } from "lucide-react";

const CppMCQ = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);

  // Sample MCQs for C++
  const questions = [
    {
      id: 1,
      question: "Which of the following is the correct way to declare a pointer to an integer in C++?",
      options: [
        "int p;",
        "int *p;",
        "int &p;",
        "pointer int p;"
      ],
      correctAnswer: 1,
      explanation: "In C++, pointers are declared using the asterisk (*) symbol. So 'int *p;' declares a pointer to an integer."
    },
    {
      id: 2,
      question: "What is the output of the following code?\n\nint x = 5;\nint y = 10;\nint z = x++ + ++y;\ncout << z;",
      options: [
        "15",
        "16",
        "17",
        "18"
      ],
      correctAnswer: 1,
      explanation: "x++ is a post-increment, so it uses the value of x (5) before incrementing it. ++y is a pre-increment, so it increments y to 11 before using its value. So z = 5 + 11 = 16."
    },
    {
      id: 3,
      question: "What is the main difference between a struct and a class in C++?",
      options: [
        "Structs cannot have methods, classes can",
        "Structs are value types, classes are reference types",
        "Members are public by default in structs, private by default in classes",
        "Structs cannot inherit from other types, classes can"
      ],
      correctAnswer: 2,
      explanation: "In C++, the only difference between a struct and a class is that members and base classes are public by default in a struct, while they are private by default in a class."
    },
    {
      id: 4,
      question: "Which STL container should be used when you need to frequently insert and remove elements from the middle of the sequence?",
      options: [
        "std::vector",
        "std::list",
        "std::array",
        "std::deque"
      ],
      correctAnswer: 1,
      explanation: "std::list is a doubly-linked list implementation that allows for constant time insertion and removal of elements from anywhere in the container."
    },
    {
      id: 5,
      question: "What is a lambda expression in C++?",
      options: [
        "A way to create anonymous functions",
        "A type of loop construct",
        "A method to overload operators",
        "A template specialization technique"
      ],
      correctAnswer: 0,
      explanation: "Lambda expressions in C++ provide a way to create anonymous function objects. They allow you to write inline, unnamed functions at the point of their use."
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(optionIndex);
    }
  };

  const checkAnswer = () => {
    if (selectedOption !== null) {
      setIsAnswerChecked(true);
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">C++ Multiple Choice Questions</h2>
        <Badge variant="outline" className="px-3 py-1 bg-primary/10">
          <BrainCircuit className="h-4 w-4 mr-1" />
          Score: {score}/{questions.length}
        </Badge>
      </div>

      {/* Question Card */}
      <Card className="p-6 border-2 bg-card">
        <div className="space-y-6">
          {/* Question */}
          <div>
            <h3 className="text-lg font-medium mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="whitespace-pre-wrap">{currentQuestionData.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 border rounded-md cursor-pointer transition-all ${
                  selectedOption === index
                    ? isAnswerChecked
                      ? index === currentQuestionData.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-primary"
                    : "hover:border-primary/50"
                } ${isAnswerChecked && index === currentQuestionData.correctAnswer ? "border-green-500 bg-green-50" : ""}`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswerChecked && (
                    <>
                      {index === currentQuestionData.correctAnswer ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : selectedOption === index ? (
                        <X className="h-5 w-5 text-red-500" />
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Explanation */}
          {isAnswerChecked && (
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-md">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700">Explanation:</h4>
                  <p className="text-blue-700">{currentQuestionData.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {isAnswerChecked ? (
              <Button
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={checkAnswer} disabled={selectedOption === null}>
                Check Answer
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CppMCQ;
