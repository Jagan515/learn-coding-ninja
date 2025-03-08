
import { MessageSquare, Sparkles } from "lucide-react";

const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <MessageSquare className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2 gradient-text">How can I help you?</h3>
      <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
        Ask me anything about the courses, programming concepts, or learning recommendations.
      </p>
      <div className="mt-6 space-y-2 w-full max-w-xs">
        <SuggestionBubble text="What are the best courses for beginners?" />
        <SuggestionBubble text="How do I use arrays in JavaScript?" />
        <SuggestionBubble text="Explain object-oriented programming" />
      </div>
    </div>
  );
};

const SuggestionBubble = ({ text }: { text: string }) => (
  <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-primary/5 cursor-pointer transition-colors flex items-center">
    <Sparkles className="h-3 w-3 mr-2 text-primary" />
    {text}
  </div>
);

export default ChatEmptyState;
