
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface ChatErrorProps {
  error: string;
  errorType: "connection" | "quota" | "general";
  onRetry: () => void;
}

const ChatError = ({ error, errorType, onRetry }: ChatErrorProps) => {
  return (
    <div className="flex items-start gap-3 animate-slideIn">
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-red-100 text-red-600 shrink-0">
        <AlertCircle className="h-5 w-5" />
      </div>
      
      <div className="bg-red-50 text-red-700 rounded-2xl p-4 shadow-sm max-w-[85%] border border-red-100">
        <div className="mb-3">
          <h4 className="font-medium mb-1">
            {errorType === "quota" 
              ? "Service Temporarily Unavailable" 
              : errorType === "connection"
                ? "Connection Error"
                : "Error"
            }
          </h4>
          <p className="text-sm">{error}</p>
        </div>
        
        {errorType !== "quota" && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="bg-white text-red-600 hover:bg-red-50 border-red-200 flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatError;
