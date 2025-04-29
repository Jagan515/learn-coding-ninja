
import { AlertTriangle, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

interface ChatErrorProps {
  error: string;
  errorType: "connection" | "quota" | "general";
  onRetry: () => void;
}

const ChatError = ({ error, errorType, onRetry }: ChatErrorProps) => {
  return (
    <motion.div 
      className="flex flex-col gap-4 p-4 rounded-lg border border-destructive/20 bg-destructive/5 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="bg-destructive/10 p-3 rounded-full">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="font-medium text-destructive">
          {errorType === "connection" 
            ? "Connection Error" 
            : errorType === "quota" 
              ? "Usage Limit Reached"
              : "Something went wrong"}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          {error}
        </p>
      </div>
      
      {errorType !== "quota" && (
        <Button 
          onClick={onRetry}
          className="mx-auto flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white"
          size="sm"
        >
          <RefreshCw className="h-3 w-3" />
          Try Again
        </Button>
      )}
      
      {errorType === "quota" && (
        <Button 
          variant="outline" 
          size="sm"
          className="mx-auto border-primary/20 text-primary hover:bg-primary/5"
          asChild
        >
          <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer">
            Learn More
            <ArrowRight className="ml-2 h-3 w-3" />
          </a>
        </Button>
      )}
    </motion.div>
  );
};

export default ChatError;
