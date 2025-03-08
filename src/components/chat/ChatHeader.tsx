
import { Button } from "../ui/button";
import { Bot, Trash2 } from "lucide-react";

interface ChatHeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

const ChatHeader = ({ onClear, hasMessages }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b bg-white/70 backdrop-blur-sm flex items-center justify-between rounded-t-lg">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-1.5 rounded-full">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-semibold gradient-text">Course Assistant (Gemini AI)</h3>
      </div>
      {hasMessages && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="h-8 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3 w-3 mr-1" />
          Clear chat
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
