
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export type ProgrammingLanguage = "python" | "java" | "c" | "cpp";

interface LanguageSelectorProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
}

const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) => {
  return (
    <ToggleGroup
      type="single"
      value={selectedLanguage}
      onValueChange={(value) => {
        if (value) onLanguageChange(value as ProgrammingLanguage);
      }}
      className="flex flex-wrap justify-start gap-1"
    >
      {["python", "java", "c", "cpp"].map((lang) => (
        <ToggleGroupItem
          key={lang}
          value={lang}
          aria-label={`Select ${lang}`}
          className={cn(
            "px-3 py-2 text-sm font-medium",
            selectedLanguage === lang
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {lang.toUpperCase()}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default LanguageSelector;
