
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Pin, Lock, Calendar, User } from "lucide-react";
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
    <div className="animate-fadeIn">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2 hover:bg-primary/10 transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Discussions</span>
      </Button>
      
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold gradient-text">{title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">{category}</Badge>
            {isPinned && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-accent/10 text-accent hover:bg-accent/20">
                <Pin className="h-3 w-3" /> Pinned
              </Badge>
            )}
            {isLocked && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-destructive/10 text-destructive hover:bg-destructive/20">
                <Lock className="h-3 w-3" /> Locked
              </Badge>
            )}
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{authorName}</span>
            </div>
            {createdAt && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadHeader;
