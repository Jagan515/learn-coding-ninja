
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

interface ChatHeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

const ChatHeader = ({ onClear, hasMessages }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Course Assistant (Gemini AI)</h3>
      </div>
      {hasMessages && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClear}
          className="h-8 px-2 text-xs"
        >
          Clear chat
        </Button>
      )}
    </div>
  );
};

export default ChatHeader;
