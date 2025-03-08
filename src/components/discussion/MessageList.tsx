
import { Message } from "@/types/discussion";
import MessageItem from "./MessageItem";
import { Separator } from "@/components/ui/separator";
import MessageEditor from "./MessageEditor";
import { Lock } from "lucide-react";

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
    <div className="space-y-6">
      <div className="space-y-6">
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
      </div>
      
      <Separator className="my-6" />
      
      {!isLocked ? (
        <MessageEditor
          onSend={onSendMessage}
          isAuthenticated={!!currentUserId}
          replyTo={replyingTo}
          onCancelReply={onCancelReply}
        />
      ) : (
        <div className="bg-muted p-4 rounded-md text-center">
          <Lock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">This thread is locked and no longer accepts new replies.</p>
        </div>
      )}
    </div>
  );
};

export default MessageList;
