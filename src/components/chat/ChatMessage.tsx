
import { cn } from "@/lib/utils";
import { Message } from "./types";
import { Bot, User } from "lucide-react";
import { motion } from "framer-motion";

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
        "flex items-center justify-center h-9 w-9 rounded-full shrink-0 shadow-sm transition-all",
        message.role === "assistant" 
          ? "bg-gradient-to-br from-primary/20 to-primary/10 text-primary" 
          : "bg-gradient-to-br from-accent/20 to-accent/10 text-accent"
      )}>
        {message.role === "assistant" ? (
          <Bot className="h-5 w-5" />
        ) : (
          <User className="h-5 w-5" />
        )}
      </div>
      
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm",
          message.role === "assistant"
            ? "bg-white dark:bg-card/90 border border-primary/5 text-foreground"
            : "bg-gradient-to-r from-primary to-accent text-white"
        )}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.content.split(/\n{2,}/).map((paragraph, idx) => (
            <span key={idx} className="block mb-3 last:mb-0">
              {paragraph}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
