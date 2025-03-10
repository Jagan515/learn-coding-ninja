
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface MCQNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  hasAnswered: boolean;
  selectedOption: string | null;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
}

const MCQNavigation: React.FC<MCQNavigationProps> = ({
  currentIndex,
  totalQuestions,
  hasAnswered,
  selectedOption,
  onCheckAnswer,
  onNextQuestion,
  onPrevQuestion,
}) => {
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
          disabled={currentIndex === totalQuestions - 1}
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
};

export default MCQNavigation;
