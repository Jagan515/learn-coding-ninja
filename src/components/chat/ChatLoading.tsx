
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
    >
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-primary/60 to-primary/40 text-white shrink-0">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
      
      <div className="flex items-center gap-1 p-3 rounded-2xl bg-white dark:bg-card border border-primary/10">
        {dots.map((dot) => (
          <motion.div
            key={dot}
            className="h-2 w-2 rounded-full bg-primary"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
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
