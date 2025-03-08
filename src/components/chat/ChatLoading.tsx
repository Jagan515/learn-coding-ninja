
import { Bot } from "lucide-react";

const ChatLoading = () => {
  return (
    <div className="flex items-start gap-3 animate-fadeIn">
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/15 text-primary shrink-0 shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-white/80 backdrop-blur-sm text-foreground border border-primary/10 rounded-2xl p-4 shadow-sm max-w-[85%]">
        <div className="flex gap-1.5 items-center">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
