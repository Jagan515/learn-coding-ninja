
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface DiscussionHeaderProps {
  onCreateThread: () => void;
  isAuthenticated: boolean;
}

const DiscussionHeader = ({ onCreateThread, isAuthenticated }: DiscussionHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Discussion Forum</h1>
        <p className="text-muted-foreground mt-1">
          Join the conversation with fellow learners and experts
        </p>
      </div>
      
      <Button 
        onClick={onCreateThread} 
        size="lg"
        className="gap-2"
        disabled={!isAuthenticated}
      >
        <PlusCircle className="h-5 w-5" />
        New Thread
      </Button>
    </div>
  );
};

export default DiscussionHeader;
