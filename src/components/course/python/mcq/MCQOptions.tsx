
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { MCQuestion, MCQOption } from "./types";

interface MCQOptionsProps {
  question?: MCQuestion;
  selectedOption?: string | null;
  hasAnswered?: boolean;
  onSelectOption?: (value: string) => void;
  // Support for the old prop pattern
  options?: string[] | MCQOption[];
  selectedOptionIndex?: number | null;
  correctOptionIndex?: number;
  onOptionSelect?: (index: number) => void;
}

const MCQOptions: React.FC<MCQOptionsProps> = ({
  question,
  selectedOption,
  hasAnswered,
  onSelectOption,
  // Old props
  options,
  selectedOptionIndex,
  correctOptionIndex,
  onOptionSelect,
}) => {
  // If using the new pattern with question object
  if (question && onSelectOption) {
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
              onClick={() => !hasAnswered && onSelectOption(option.id)}
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
  }
  
  // If using the old pattern with options array
  if (options && onOptionSelect !== undefined) {
    // Convert string options to the format needed for display
    const formattedOptions = Array.isArray(options) 
      ? options.map((opt, idx) => {
          if (typeof opt === 'string') {
            return { id: String(idx), text: opt };
          }
          return opt as MCQOption;
        })
      : [];
      
    return (
      <RadioGroup value={selectedOptionIndex !== null ? String(selectedOptionIndex) : ""} className="space-y-3">
        {formattedOptions.map((option, index) => {
          const isSelected = selectedOptionIndex === index;
          const isCorrect = correctOptionIndex !== undefined && correctOptionIndex === index;
          let optionClass = "border-2 p-4 rounded-lg transition-all";
          
          if (hasAnswered) {
            if (isSelected && isCorrect) {
              optionClass += " border-green-500 bg-green-50";
            } else if (isSelected && !isCorrect) {
              optionClass += " border-red-500 bg-red-50";
            } else if (isCorrect) {
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
              key={index}
              className={optionClass}
              onClick={() => !hasAnswered && onOptionSelect(index)}
            >
              <div className="flex items-start">
                <RadioGroupItem 
                  value={String(index)} 
                  id={`option-${index}`} 
                  className="mt-1"
                  disabled={hasAnswered}
                />
                <div className="ml-3 w-full">
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="text-base font-medium cursor-pointer w-full"
                  >
                    {option.text}
                  </Label>
                </div>
                {hasAnswered && correctOptionIndex !== undefined && (
                  <div className="ml-auto pl-2">
                    {isCorrect ? (
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
  }
  
  return <div>No options provided</div>;
};

export default MCQOptions;
