
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ChatEmptyState = () => {
  const suggestedQuestions = [
    "Explain arrays in Python",
    "How do I create a function?",
    "What are the control flow statements?",
    "Explain object-oriented programming"
  ];

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center py-8 px-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div 
        className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4"
        variants={item}
      >
        <SparklesIcon className="w-8 h-8 text-primary" />
      </motion.div>
      
      <motion.h3 
        className="text-lg font-semibold mb-2"
        variants={item}
      >
        Ask Your Learning Assistant
      </motion.h3>
      
      <motion.p 
        className="text-sm text-muted-foreground mb-6 max-w-xs"
        variants={item}
      >
        Get help with course content, coding concepts, or ask for examples and explanations.
      </motion.p>
      
      <motion.div 
        className="space-y-2 w-full max-w-md"
        variants={item}
      >
        {suggestedQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-sm w-full justify-start border-primary/10 hover:bg-primary/5 hover:text-primary"
            onClick={() => {
              const input = document.querySelector("textarea");
              if (input) {
                const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
                  window.HTMLTextAreaElement.prototype,
                  "value"
                )?.set;
                nativeTextAreaValueSetter?.call(input, question);
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.focus();
              }
            }}
          >
            <SparklesIcon className="mr-2 h-4 w-4 text-primary" />
            {question}
          </Button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ChatEmptyState;
