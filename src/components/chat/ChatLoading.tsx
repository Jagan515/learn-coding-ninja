
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

const ChatLoading = () => {
  return (
    <motion.div 
      className="flex items-start gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary shrink-0 shadow-sm">
        <Bot className="h-5 w-5" />
      </div>
      
      <div className="bg-white/80 dark:bg-card/90 backdrop-blur-sm text-foreground border border-primary/10 rounded-2xl p-5 shadow-sm max-w-[85%]">
        <div className="flex gap-1.5 items-center">
          <motion.div 
            className="h-2.5 w-2.5 bg-primary rounded-full"
            animate={{ scale: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="h-2.5 w-2.5 bg-primary rounded-full"
            animate={{ scale: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div 
            className="h-2.5 w-2.5 bg-primary rounded-full"
            animate={{ scale: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatLoading;
