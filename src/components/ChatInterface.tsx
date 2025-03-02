
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import ChatHeader from "./chat/ChatHeader";
import ChatMessage from "./chat/ChatMessage";
import ChatEmptyState from "./chat/ChatEmptyState";
import ChatError from "./chat/ChatError";
import ChatLoading from "./chat/ChatLoading";
import ChatInput from "./chat/ChatInput";
import { Message, ChatContext } from "./chat/types";

interface ChatInterfaceProps {
  courseContext: ChatContext;
}

const ChatInterface = ({ courseContext }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<"connection" | "quota" | "general">("general");
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
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
        if (data.error.includes("quota") || 
            data.error.includes("billing") || 
            data.error.includes("limit")) {
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
      if (errorMessage.includes("quota") || 
          errorMessage.includes("billing") || 
          errorMessage.includes("limit")) {
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

  const retryLastMessage = () => {
    if (messages.length === 0) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === "user");
    
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    
    // Remove the last failed assistant message if it exists
    if (error) {
      setMessages(prev => prev.filter((_, i) => i !== prev.length - 1));
      setError(null);
      setErrorType("general");
    }
    
    // Resend the last user message
    handleSendMessage(lastUserMessage.content);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    setErrorType("general");
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-white dark:bg-card shadow-sm">
      <ChatHeader onClear={clearChat} hasMessages={messages.length > 0} />

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <ChatEmptyState />
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {/* Error state with retry button */}
          {error && (
            <ChatError error={error} errorType={errorType} onRetry={retryLastMessage} />
          )}

          {/* Loading indicator */}
          {isLoading && <ChatLoading />}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <ChatInput 
        onSubmit={handleSendMessage} 
        isLoading={isLoading} 
        disabled={errorType === "quota"} 
      />
    </div>
  );
};

export default ChatInterface;
