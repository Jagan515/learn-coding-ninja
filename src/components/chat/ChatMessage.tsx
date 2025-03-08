
import { cn } from "@/lib/utils";
import { Message } from "./types";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-slideIn",
        message.role === "assistant" ? "items-start" : "items-start flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex items-center justify-center h-8 w-8 rounded-full shrink-0 shadow-sm",
        message.role === "assistant" 
          ? "bg-primary/15 text-primary" 
          : "bg-accent/15 text-accent"
      )}>
        {message.role === "assistant" ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl p-4 shadow-sm",
          message.role === "assistant"
            ? "bg-white/80 backdrop-blur-sm text-foreground border border-primary/10"
            : "bg-gradient-to-r from-primary to-accent text-white"
        )}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
