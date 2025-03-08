
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pin, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ThreadHeaderProps {
  title: string;
  category: string;
  createdAt: Date | null;
  authorName: string;
  isPinned: boolean;
  isLocked: boolean;
  onBack: () => void;
}

const ThreadHeader = ({
  title,
  category,
  createdAt,
  authorName,
  isPinned,
  isLocked,
  onBack,
}: ThreadHeaderProps) => {
  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Discussions</span>
      </Button>
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline">{category}</Badge>
            {isPinned && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Pin className="h-3 w-3" /> Pinned
              </Badge>
            )}
            {isLocked && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> Locked
              </Badge>
            )}
            <span>Started by {authorName}</span>
            {createdAt && (
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreadHeader;
