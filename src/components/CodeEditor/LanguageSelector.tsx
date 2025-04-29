
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export type ProgrammingLanguage = "python" | "java" | "c" | "cpp";

interface LanguageSelectorProps {
  language: ProgrammingLanguage;
  onChange: (language: ProgrammingLanguage) => void;
  disabled?: boolean;
}

const LanguageSelector = ({
  language,
  onChange,
  disabled = false,
}: LanguageSelectorProps) => {
  return (
    <ToggleGroup
      type="single"
      value={language}
      onValueChange={(value) => {
        if (value) onChange(value as ProgrammingLanguage);
      }}
      className="flex flex-wrap justify-start gap-1"
      disabled={disabled}
    >
      {["python", "java", "c", "cpp"].map((lang) => (
        <ToggleGroupItem
          key={lang}
          value={lang}
          aria-label={`Select ${lang}`}
          className={cn(
            "px-3 py-2 text-sm font-medium",
            language === lang
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
          disabled={disabled}
        >
          {lang.toUpperCase()}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default LanguageSelector;
