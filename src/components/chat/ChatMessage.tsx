
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
        "flex gap-3",
        message.role === "assistant" ? "items-start" : "items-start flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex items-center justify-center h-8 w-8 rounded-full shrink-0",
        message.role === "assistant" 
          ? "bg-primary/10 text-primary" 
          : "bg-muted text-foreground"
      )}>
        {message.role === "assistant" ? (
          <Bot className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.role === "assistant"
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
