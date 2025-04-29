
import { useState, useRef, FormEvent, KeyboardEvent } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Send, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white/80 backdrop-blur-sm rounded-b-lg dark:bg-card/90 border-primary/10">
      <div className="relative">
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the course..."
          className="min-h-[60px] resize-none pr-14 bg-white/60 border-primary/20 focus-visible:ring-primary/30 rounded-xl dark:bg-card/50 transition-all"
          disabled={isLoading || disabled}
        />
        
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute right-2 bottom-2"
          >
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || disabled || !input.trim()}
              className={`rounded-lg ${input.trim() ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' : 'bg-muted'} text-white shadow-sm transition-all duration-300`}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">
          Press Enter to send, Shift+Enter for a new line
        </p>
        
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {thinking && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-xs flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-700/30"
              >
                <Zap className="h-3 w-3 text-amber-500" />
                <span>AI thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>
          
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
