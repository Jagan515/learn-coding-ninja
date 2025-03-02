
import { MessageSquare } from "lucide-react";

const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-4">
      <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">How can I help you?</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Ask me anything about the courses, programming concepts, or learning recommendations.
      </p>
    </div>
  );
};

export default ChatEmptyState;
