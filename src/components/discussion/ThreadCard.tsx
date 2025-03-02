
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Users, Pin, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Thread } from "@/types/discussion";
import { Card } from "@/components/ui/card";

interface ThreadCardProps {
  thread: Thread;
  onClick: () => void;
}

const ThreadCard = ({ thread, onClick }: ThreadCardProps) => {
  return (
    <Card 
      className="p-4 hover:bg-accent/30 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {thread.isPinned && (
              <Pin className="h-4 w-4 text-primary" />
            )}
            <h3 className="text-lg font-medium">{thread.title}</h3>
          </div>
          {thread.isLocked && (
            <Lock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{thread.category}</Badge>
          <span>•</span>
          <span>Started by {thread.createdBy.name}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(thread.updatedAt), { addSuffix: true })}</span>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{thread.replyCount} replies</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{thread.participantCount} participants</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThreadCard;
