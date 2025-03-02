
import { Bot } from "lucide-react";

const ChatLoading = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary shrink-0">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-muted text-foreground rounded-lg p-3">
        <div className="flex gap-1 items-center">
          <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
