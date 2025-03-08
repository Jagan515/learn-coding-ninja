
import { Message } from "@/types/discussion";
import MessageItem from "./MessageItem";
import { Separator } from "@/components/ui/separator";
import MessageEditor from "./MessageEditor";
import { Lock, MessageSquare, Users } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  rootMessages: Message[];
  currentUserId: string | null;
  isLocked: boolean;
  replyingTo: Message | null;
  onDelete: (messageId: string) => void;
  onLike: (messageId: string) => void;
  onReply: (message: Message) => void;
  onCancelReply: () => void;
  onSendMessage: (content: string) => void;
}

const MessageList = ({
  messages,
  rootMessages,
  currentUserId,
  isLocked,
  replyingTo,
  onDelete,
  onLike,
  onReply,
  onCancelReply,
  onSendMessage,
}: MessageListProps) => {
  // Helper function to get replies for a message
  const getRepliesForMessage = (messageId: string): Message[] => {
    return messages.filter(msg => msg.parentId === messageId);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-8">
        {rootMessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            currentUserId={currentUserId || undefined}
            onDelete={onDelete}
            onLike={onLike}
            onReply={onReply}
            replies={getRepliesForMessage(message.id)}
          />
        ))}
        
        {rootMessages.length === 0 && (
          <div className="text-center py-10">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">No messages yet</h3>
            <p className="text-muted-foreground mt-1">Be the first to start this discussion</p>
          </div>
        )}
      </div>
      
      <Separator className="my-8" />
      
      {!isLocked ? (
        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 shadow-sm border animate-slideIn">
          <MessageEditor
            onSend={onSendMessage}
            isAuthenticated={!!currentUserId}
            replyTo={replyingTo}
            onCancelReply={onCancelReply}
          />
        </div>
      ) : (
        <div className="bg-muted/50 backdrop-blur-sm p-6 rounded-lg text-center border border-muted animate-slideIn">
          <Lock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground font-medium">This thread is locked and no longer accepts new replies.</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;
