
import { Button } from "@/components/ui/button";
import { Bot, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";

interface ChatHeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

const ChatHeader = ({ onClear, hasMessages }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-primary/10 bg-white/50 backdrop-blur-sm dark:bg-card/90">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent text-white">
          <Bot className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Course Assistant</h3>
          <p className="text-xs text-muted-foreground">Powered by Gemini AI</p>
        </div>
      </div>
      
      {hasMessages && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClear} 
            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ChatHeader;
