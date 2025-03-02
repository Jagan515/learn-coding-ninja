
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, Reply, Trash, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Message } from "@/types/discussion";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
  currentUserId?: string;
  onDelete: (messageId: string) => void;
  onLike: (messageId: string) => void;
  onReply: (message: Message) => void;
  replies?: Message[];
  isReply?: boolean;
}

const MessageItem = ({
  message,
  currentUserId,
  onDelete,
  onLike,
  onReply,
  replies = [],
  isReply = false,
}: MessageItemProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const canDelete = currentUserId === message.userId;
  const hasReplies = replies.length > 0;

  const handleDelete = () => {
    onDelete(message.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className={cn("", isReply && "ml-12 mt-4")}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {message.userAvatar ? (
              <img
                src={message.userAvatar}
                alt={message.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {message.userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Message content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{message.userName}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(message.createdAt), {
                addSuffix: true,
              })}
            </span>
            {message.isEdited && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>

          <div className="mt-2 text-sm">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 h-8 px-2"
              onClick={() => onLike(message.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{message.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 h-8 px-2"
              onClick={() => onReply(message)}
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </Button>

            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {hasReplies && (
        <div className="mt-4 pl-14 border-l-2 border-muted space-y-4">
          {replies.map((reply) => (
            <MessageItem
              key={reply.id}
              message={reply}
              currentUserId={currentUserId}
              onDelete={onDelete}
              onLike={onLike}
              onReply={onReply}
              isReply={true}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageItem;
