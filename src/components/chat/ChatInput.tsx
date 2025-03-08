
import { useState, useRef, FormEvent, KeyboardEvent } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Loader2, Send, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

const ChatInput = ({ onSubmit, isLoading, disabled }: ChatInputProps) => {
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
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white/70 backdrop-blur-sm rounded-b-lg">
      <div className="relative">
        <Textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the course..."
          className="min-h-[60px] resize-none pr-12 bg-white/60 border-primary/10 focus-visible:ring-primary/20 rounded-xl"
          disabled={isLoading || disabled}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || disabled}
          className="absolute right-2 bottom-2 rounded-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-sm"
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
        <div className="flex items-center text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 mr-1 text-primary" />
          <span>Powered by Gemini AI</span>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
