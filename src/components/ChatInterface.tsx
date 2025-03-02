
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { MessageSquare, Loader2, Bot, Send, User, XCircle, RefreshCcw, AlertCircle } from "lucide-react";
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
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"connection" | "quota" | "general">("general");
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
    setError(null);
    setErrorType("general");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Sending message to chat function:", userMessage);
      
      // Send the last 5 messages as context to maintain a meaningful conversation
      const chatHistory = messages.slice(-5).map(msg => ({ 
        role: msg.role, 
        content: msg.content 
      }));
      
      const { data, error } = await supabase.functions.invoke<{ 
        message: string; 
        error?: string;
        usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
      }>(
        "chat-completion",
        {
          body: {
            message: userMessage,
            context: courseContext,
            history: chatHistory
          }
        }
      );

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (data?.error) {
        console.error("Chat completion returned error:", data.error);
        
        // Check for quota exceeded error
        if (data.error.includes("exceeded your current quota") || data.error.includes("billing details")) {
          setErrorType("quota");
          throw new Error("The AI service is currently unavailable due to quota limitations. Please try again later.");
        }
        
        throw new Error(data.error);
      }

      if (!data?.message) {
        throw new Error("No response received from the assistant");
      }

      console.log("Received response from chat function:", data);
      
      if (data.usage) {
        console.log("Token usage:", data.usage);
      }

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.message }
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to get a response. Please try again.";
      
      setError(errorMessage);
      
      // Set correct error type
      if (errorMessage.includes("quota") || errorMessage.includes("billing")) {
        setErrorType("quota");
      } else {
        setErrorType("connection");
      }
      
      toast({
        variant: "destructive",
        title: "Chat Error",
        description: errorType === "quota" 
          ? "Our AI service is temporarily unavailable due to usage limits. Please try again later." 
          : "We couldn't connect to our assistant. Please check your connection and try again.",
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

  const retryLastMessage = () => {
    if (messages.length === 0) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === "user");
    
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    setInput(lastUserMessage.content);
    
    // Remove the last failed assistant message if it exists
    if (error) {
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
      setError(null);
      setErrorType("general");
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setErrorType("general");
    setInput("");
    inputRef.current?.focus();
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
            onClick={clearChat}
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
            ))
          )}

          {/* Error state with retry button */}
          {error && (
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-destructive/10 text-destructive shrink-0">
                {errorType === "quota" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
              </div>
              <div className="flex flex-col gap-2 max-w-[80%]">
                <div className="bg-destructive/10 text-destructive rounded-lg p-3">
                  <p className="text-sm font-medium">
                    {errorType === "quota" 
                      ? "Service Temporarily Unavailable" 
                      : "Connection Error"}
                  </p>
                  <p className="text-xs mt-1">
                    {errorType === "quota"
                      ? "Our AI assistant is currently unavailable. The team has been notified and is working to restore service."
                      : "We couldn't connect to our assistant. Please check your connection and try again."}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-fit" 
                  onClick={retryLastMessage}
                >
                  <RefreshCcw className="h-3 w-3 mr-2" /> 
                  Try again
                </Button>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
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
            disabled={isLoading || errorType === "quota"}
          />
          <Button type="submit" size="icon" disabled={isLoading || errorType === "quota"}>
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
