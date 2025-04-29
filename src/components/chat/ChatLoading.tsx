
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ChatLoading = () => {
  const dots = [0, 1, 2];
  
  return (
    <motion.div 
      className="flex items-start gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/60 text-white shrink-0 shadow-lg">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
      
      <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-white/95 dark:bg-card/95 border border-primary/10 shadow-md backdrop-blur-sm">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className="h-3 w-3 rounded-full bg-gradient-to-r from-primary to-accent"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 1, 0.3], 
              scale: [0.8, 1, 0.8] 
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: dot * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ChatLoading;
