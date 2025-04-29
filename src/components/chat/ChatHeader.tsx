
import { Button } from "@/components/ui/button";
import { Bot, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ChatHeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

const ChatHeader = ({ onClear, hasMessages }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-gradient-to-r from-white/95 to-slate-50/95 backdrop-blur-sm dark:from-card/98 dark:to-card/95 rounded-t-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-md">
          <Bot className="h-5 w-5" />
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
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClear} 
            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ChatHeader;
