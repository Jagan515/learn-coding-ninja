
import { MessageSquare, Sparkles, Code, Book, Lightbulb, Search } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ChatEmptyState = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-72 text-center p-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="bg-gradient-to-br from-primary/20 to-primary/5 p-3 rounded-full mb-4"
        variants={item}
      >
        <MessageSquare className="h-8 w-8 text-primary" />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-medium mb-2 gradient-text"
        variants={item}
      >
        How can I help you learn?
      </motion.h3>
      
      <motion.p 
        className="text-muted-foreground text-sm max-w-xs leading-relaxed"
        variants={item}
      >
        Ask me anything about the courses, programming concepts, or learning recommendations.
      </motion.p>
      
      <motion.div 
        className="mt-6 space-y-2 w-full max-w-xs"
        variants={item}
      >
        <div className="grid grid-cols-2 gap-2">
          <SuggestionBubble icon={<Book className="h-3 w-3" />} text="What topics are covered in this course?" />
          <SuggestionBubble icon={<Code className="h-3 w-3" />} text="Explain functions in Python" />
          <SuggestionBubble icon={<Search className="h-3 w-3" />} text="What are loops used for?" />
          <SuggestionBubble icon={<Lightbulb className="h-3 w-3" />} text="Give me practice problems" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SuggestionBubble = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="bg-white/50 backdrop-blur-sm border border-primary/10 rounded-full px-3 py-2 text-xs text-muted-foreground hover:bg-primary/5 cursor-pointer transition-colors flex items-center">
    <span className="mr-1.5 text-primary">{icon}</span>
    {text}
  </div>
);

export default ChatEmptyState;
