
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ChallengeOutputProps {
  runOutput: string | null;
  allTestsPassed: boolean;
}

const ChallengeOutput = ({ runOutput, allTestsPassed }: ChallengeOutputProps) => {
  if (!runOutput) return null;
  
  return (
    <Alert className={allTestsPassed ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}>
      <AlertDescription className="flex items-start gap-2">
        {allTestsPassed ? (
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
        )}
        <span className={allTestsPassed ? "text-green-700" : "text-amber-700"}>
          {runOutput}
        </span>
      </AlertDescription>
    </Alert>
  );
};

export default ChallengeOutput;
