
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface MCQOption {
  id: string;
  text: string;
}

interface MCQuestion {
  id: string;
  question: string;
  code?: string;
  options: MCQOption[];
  correctOption: string;
  explanation: string;
}

// Sample MCQs
const mcqQuestions: MCQuestion[] = [
  {
    id: "q1",
    question: "What is the output of the following code?",
    code: "x = 5\ny = 10\nprint(x + y)",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "10" },
      { id: "c", text: "15" },
      { id: "d", text: "Error" }
    ],
    correctOption: "c",
    explanation: "The code adds the variables x (with value 5) and y (with value 10), resulting in 15."
  },
  {
    id: "q2",
    question: "Which of the following is NOT a valid Python data type?",
    options: [
      { id: "a", text: "int" },
      { id: "b", text: "str" },
      { id: "c", text: "bool" },
      { id: "d", text: "char" }
    ],
    correctOption: "d",
    explanation: "Python does not have a built-in 'char' data type. Individual characters are represented as strings of length 1."
  },
  {
    id: "q3",
    question: "What will be the value of the following expression?",
    code: "5 // 2",
    options: [
      { id: "a", text: "2.5" },
      { id: "b", text: "2" },
      { id: "c", text: "2.0" },
      { id: "d", text: "Error" }
    ],
    correctOption: "b",
    explanation: "The // operator performs integer division (floor division), which returns the largest integer less than or equal to the result. So 5 // 2 equals 2, not 2.5."
  }
];

const PythonMCQ = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const currentQuestion = mcqQuestions[currentQuestionIndex];
  const hasAnswered = answeredQuestions.has(currentQuestion.id);
  const isCorrect = selectedOption === currentQuestion.correctOption;

  const handleSelectOption = (value: string) => {
    if (hasAnswered) return;
    setSelectedOption(value);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    setShowExplanation(true);
    
    if (!hasAnswered) {
      setAnsweredQuestions(new Set(answeredQuestions).add(currentQuestion.id));
      
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const getProgressPercentage = () => {
    return (answeredQuestions.size / mcqQuestions.length) * 100;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">Multiple Choice Questions</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
          <span className="font-medium">Score:</span>
          <span>{score}/{mcqQuestions.length}</span>
        </div>
      </div>

      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>

      <div className="bg-card rounded-xl border p-6 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            Question {currentQuestionIndex + 1} of {mcqQuestions.length}
          </h3>
          <p className="text-lg">{currentQuestion.question}</p>
          
          {currentQuestion.code && (
            <pre className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
              {currentQuestion.code}
            </pre>
          )}
        </div>

        <RadioGroup 
          value={selectedOption || ""} 
          className="space-y-3"
        >
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOption;
            let optionClass = "border-2 p-4 rounded-lg transition-all";
            
            if (hasAnswered) {
              if (isSelected && isCorrectOption) {
                optionClass += " border-green-500 bg-green-50";
              } else if (isSelected && !isCorrectOption) {
                optionClass += " border-red-500 bg-red-50";
              } else if (isCorrectOption) {
                optionClass += " border-green-500 bg-green-50";
              } else {
                optionClass += " border-transparent";
              }
            } else {
              optionClass += isSelected 
                ? " border-primary bg-primary/5" 
                : " border-transparent hover:border-primary/30 hover:bg-accent";
            }

            return (
              <div 
                key={option.id}
                className={optionClass}
                onClick={() => handleSelectOption(option.id)}
              >
                <div className="flex items-start">
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id} 
                    className="mt-1"
                    disabled={hasAnswered}
                  />
                  <div className="ml-3 w-full">
                    <Label 
                      htmlFor={option.id} 
                      className="text-base font-medium cursor-pointer w-full"
                    >
                      {option.text}
                    </Label>
                  </div>
                  {hasAnswered && (
                    <div className="ml-auto pl-2">
                      {isCorrectOption ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        isSelected && <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>

        {showExplanation && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg"
          >
            <div className="flex gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Explanation</h4>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {hasAnswered ? (
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === mcqQuestions.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className="flex items-center gap-2"
            >
              Check Answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PythonMCQ;
