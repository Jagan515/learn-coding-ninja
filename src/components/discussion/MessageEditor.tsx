
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import { Message } from "@/types/discussion";

interface MessageEditorProps {
  onSend: (content: string) => void;
  isAuthenticated: boolean;
  replyTo: Message | null;
  onCancelReply: () => void;
  isDisabled?: boolean;
}

const MessageEditor = ({
  onSend,
  isAuthenticated,
  replyTo,
  onCancelReply,
  isDisabled = false,
}: MessageEditorProps) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (content.trim() && isAuthenticated && !isDisabled) {
      onSend(content.trim());
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      {replyTo && (
        <div className="mb-3 p-2 bg-muted rounded-md flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              Replying to {replyTo.userName}
            </p>
            <p className="text-sm line-clamp-1">{replyTo.content}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancelReply}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex flex-col">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isAuthenticated
              ? "Type your message here..."
              : "Please sign in to participate in discussions"
          }
          className="min-h-[100px] resize-none"
          disabled={!isAuthenticated || isDisabled}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            Press Ctrl+Enter to send
          </p>
          <Button
            onClick={handleSend}
            disabled={!content.trim() || !isAuthenticated || isDisabled}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageEditor;
