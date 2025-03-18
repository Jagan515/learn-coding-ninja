
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MCQNavigationProps {
  currentIndex?: number;
  totalQuestions?: number;
  hasAnswered?: boolean;
  selectedOption?: string | null;
  onCheckAnswer?: () => void;
  onNextQuestion?: () => void;
  onPrevQuestion?: () => void;
  // Support for old prop pattern
  onNext?: () => void;
  onPrevious?: () => void;
  currentQuestionIndex?: number;
}

const MCQNavigation: React.FC<MCQNavigationProps> = ({
  currentIndex,
  totalQuestions,
  hasAnswered,
  selectedOption,
  onCheckAnswer,
  onNextQuestion,
  onPrevQuestion,
  // Old props
  onNext,
  onPrevious,
  currentQuestionIndex,
}) => {
  // Determine which props pattern to use
  const useNewPattern = onNextQuestion !== undefined || onPrevQuestion !== undefined;
  const useOldPattern = onNext !== undefined || onPrevious !== undefined;
  
  // If neither pattern is used, return null
  if (!useNewPattern && !useOldPattern) return null;
  
  // Use the new pattern
  if (useNewPattern) {
    return (
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevQuestion}
          disabled={currentIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        {hasAnswered ? (
          <Button
            onClick={onNextQuestion}
            disabled={currentIndex === (totalQuestions || 0) - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onCheckAnswer}
            disabled={!selectedOption}
            className="flex items-center gap-2"
          >
            Check Answer
          </Button>
        )}
      </div>
    );
  }
  
  // Use the old pattern
  return (
    <div className="flex justify-between pt-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous
      </Button>

      <Button
        onClick={onNext}
        className="flex items-center gap-2"
      >
        Next
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MCQNavigation;
