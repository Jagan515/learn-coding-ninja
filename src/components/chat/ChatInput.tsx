
import { useState, useRef, FormEvent, KeyboardEvent } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Send, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
  thinking?: boolean;
}

const ChatInput = ({ onSubmit, isLoading, disabled, thinking = false }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || disabled) return;
    onSubmit(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white/80 backdrop-blur-sm rounded-b-lg dark:bg-card/90">
      <div className="relative">
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the course..."
          className="min-h-[60px] resize-none pr-12 bg-white/60 border-primary/10 focus-visible:ring-primary/20 rounded-xl dark:bg-card/50 transition-all"
          disabled={isLoading || disabled}
        />
        
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || disabled || !input.trim()}
          className={`absolute right-2 bottom-2 rounded-lg ${input.trim() ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' : 'bg-muted'} text-white shadow-sm transition-all duration-300`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for a new line
        </p>
        
        <div className="flex items-center gap-2">
          {thinking && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-full"
            >
              <Zap className="h-3 w-3 text-amber-500" />
              <span className="text-primary">AI thinking...</span>
            </motion.div>
          )}
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 mr-1 text-primary" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
