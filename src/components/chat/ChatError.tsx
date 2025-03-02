
import { Button } from "../ui/button";
import { AlertCircle, RefreshCcw, XCircle } from "lucide-react";

interface ChatErrorProps {
  error: string;
  errorType: "connection" | "quota" | "general";
  onRetry: () => void;
}

const ChatError = ({ error, errorType, onRetry }: ChatErrorProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive/10 text-destructive shrink-0">
        {errorType === "quota" ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
      </div>
      <div className="flex flex-col gap-2 max-w-[80%]">
        <div className="bg-destructive/10 text-destructive rounded-lg p-3">
          <p className="text-sm font-medium">
            {errorType === "quota" 
              ? "Service Temporarily Unavailable" 
              : "Connection Error"}
          </p>
          <p className="text-xs mt-1">
            {errorType === "quota"
              ? "Our AI assistant is currently unavailable. The team has been notified and is working to restore service."
              : "We couldn't connect to our assistant. Please check your connection and try again."}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-fit" 
          onClick={onRetry}
        >
          <RefreshCcw className="h-3 w-3 mr-2" /> 
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ChatError;
