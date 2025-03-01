
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { MessageSquare, Loader2, Bot, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface ChatInterfaceProps {
  courseContext: {
    title: string;
    description: string;
    currentSection?: string;
  };
}

const ChatInterface = ({ courseContext }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on first render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Sending message to chat function:", userMessage);
      
      const { data, error } = await supabase.functions.invoke<{ message: string }>(
        "chat-completion",
        {
          body: {
            message: userMessage,
            context: courseContext,
            history: messages.slice(-5) // Send last 5 messages for context
          }
        }
      );

      if (error) {
        console.error("Chat function error:", error);
        throw error;
      }

      if (!data?.message) {
        throw new Error("No response received from the assistant");
      }

      console.log("Received response from chat function:", data);

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.message }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I'm having trouble responding right now. Please try again later." 
        }
      ]);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-white dark:bg-card shadow-sm">
      <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Course Assistant</h3>
        </div>
        {messages.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setMessages([])}
            className="h-8 px-2 text-xs"
          >
            Clear chat
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-4">
              <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">How can I help you?</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Ask me anything about the courses, programming concepts, or learning recommendations.
              </p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-2",
                  message.role === "assistant" ? "items-start" : "items-start flex-row-reverse"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center h-8 w-8 rounded-full",
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
                    "max-w-[75%] rounded-lg p-3",
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about the course..."
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
