
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Bot } from "lucide-react";

interface ChallengeOutputProps {
  runOutput: string | null;
  allTestsPassed: boolean;
}

const ChallengeOutput = ({ runOutput, allTestsPassed }: ChallengeOutputProps) => {
  if (!runOutput) return null;
  
  // Format for Claude AI feedback - this mimics real AI integration
  if (allTestsPassed) {
    return (
      <div className="space-y-3">
        <Alert className="bg-green-50 border-green-100">
          <AlertDescription className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <span className="text-green-700">
              {runOutput}
            </span>
          </AlertDescription>
        </Alert>
        
        <Alert className="bg-blue-50 border-blue-100">
          <AlertDescription className="flex items-start gap-2">
            <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-blue-700">
              <p className="font-medium mb-1">Claude AI Analysis:</p>
              <p>Great job! Your solution is correct and efficient. Here's what you did well:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Proper algorithm implementation</li>
                <li>Good variable naming</li>
                <li>Efficient code structure</li>
              </ul>
              <p className="mt-2">For further optimization, consider edge cases and time complexity.</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  } else {
    return (
      <div className="space-y-3">
        <Alert className="bg-amber-50 border-amber-100">
          <AlertDescription className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <span className="text-amber-700">
              {runOutput}
            </span>
          </AlertDescription>
        </Alert>
        
        <Alert className="bg-blue-50 border-blue-100">
          <AlertDescription className="flex items-start gap-2">
            <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-blue-700">
              <p className="font-medium mb-1">Claude AI Suggestions:</p>
              <p>Your solution is on the right track but has some issues. Here are some hints:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Check your loop conditions</li>
                <li>Make sure you're handling all test cases</li>
                <li>Review your algorithm's logic for edge cases</li>
              </ul>
              <p className="mt-2">Try debugging by adding print statements to track variable values.</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
};

export default ChallengeOutput;
