
import { useState } from "react";
import MCQQuestion from "./mcq/MCQQuestion";
import MCQOptions from "./mcq/MCQOptions";
import MCQExplanation from "./mcq/MCQExplanation";
import MCQNavigation from "./mcq/MCQNavigation";
import MCQProgressBar from "./mcq/MCQProgressBar";
import { mcqQuestions } from "./mcq/mcqData";

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

      <MCQProgressBar progress={getProgressPercentage()} />

      <div className="bg-card rounded-xl border p-6 shadow-sm space-y-6">
        <MCQQuestion 
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={mcqQuestions.length}
        />
        
        <MCQOptions 
          question={currentQuestion}
          selectedOption={selectedOption}
          hasAnswered={hasAnswered}
          onSelectOption={handleSelectOption}
        />

        <MCQExplanation 
          explanation={currentQuestion.explanation}
          show={showExplanation}
        />

        <MCQNavigation 
          currentIndex={currentQuestionIndex}
          totalQuestions={mcqQuestions.length}
          hasAnswered={hasAnswered}
          selectedOption={selectedOption}
          onCheckAnswer={handleCheckAnswer}
          onNextQuestion={handleNextQuestion}
          onPrevQuestion={handlePrevQuestion}
        />
      </div>
    </div>
  );
};

export default PythonMCQ;
