
import { Button } from "../ui/button";
import { Bot, Trash2, RefreshCw, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ChatHeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

const ChatHeader = ({ onClear, hasMessages }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b bg-white/90 dark:bg-card/95 backdrop-blur-sm flex items-center justify-between rounded-t-lg shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-2 rounded-full">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold gradient-text">Course Assistant</h3>
          <p className="text-xs text-muted-foreground">Powered by Gemini AI</p>
        </div>
      </div>
      
      {hasMessages && (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/10"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Regenerate response</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onClear}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
