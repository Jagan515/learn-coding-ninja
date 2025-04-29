
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
        "flex gap-3.5",
        message.role === "assistant" ? "items-start" : "items-start flex-row-reverse"
      )}
    >
      <div className={cn(
        "flex items-center justify-center h-9 w-9 rounded-full shrink-0 shadow-md transition-all",
        message.role === "assistant" 
          ? "bg-gradient-to-br from-primary to-primary/60 text-white" 
          : "bg-gradient-to-br from-accent to-accent/60 text-white"
      )}>
        {message.role === "assistant" ? (
          <Bot className="h-5 w-5" />
        ) : (
          <User className="h-5 w-5" />
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm",
          message.role === "assistant"
            ? "bg-white/95 dark:bg-card/95 backdrop-blur-sm border border-primary/10 text-foreground"
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
      </motion.div>
    </div>
  );
};

export default ChatMessage;
