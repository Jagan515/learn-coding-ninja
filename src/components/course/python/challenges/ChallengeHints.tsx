
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface ChallengeHintsProps {
  hints: string[];
  currentHint: number;
  onNextHint: () => void;
}

const ChallengeHints = ({ 
  hints, 
  currentHint, 
  onNextHint 
}: ChallengeHintsProps) => {
  return (
    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
      <h4 className="font-medium text-amber-800 flex items-center gap-2">
        <Info className="h-4 w-4" />
        Hint {currentHint + 1} of {hints.length}
      </h4>
      <p className="text-amber-700 mt-1">{hints[currentHint]}</p>
      {currentHint < hints.length - 1 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onNextHint}
          className="mt-2 text-amber-800 hover:text-amber-900 hover:bg-amber-100"
        >
          Next hint
        </Button>
      )}
    </div>
  );
};

export default ChallengeHints;
