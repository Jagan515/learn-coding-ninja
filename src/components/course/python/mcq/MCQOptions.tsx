
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { MCQuestion } from "./types";

interface MCQOptionsProps {
  question: MCQuestion;
  selectedOption: string | null;
  hasAnswered: boolean;
  onSelectOption: (value: string) => void;
}

const MCQOptions: React.FC<MCQOptionsProps> = ({
  question,
  selectedOption,
  hasAnswered,
  onSelectOption,
}) => {
  return (
    <RadioGroup value={selectedOption || ""} className="space-y-3">
      {question.options.map((option) => {
        const isSelected = selectedOption === option.id;
        const isCorrectOption = option.id === question.correctOption;
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
            onClick={() => onSelectOption(option.id)}
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
  );
};

export default MCQOptions;
