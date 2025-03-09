
import { Button } from "@/components/ui/button";
import { Info, ChevronRight, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface ChallengeHintsProps {
  hints: string[];
  currentHint: number;
  onNextHint: () => void;
}

const ChallengeHints = ({ 
  hints, 
  currentHint, 
  onNextHint 
}: ChallengeHintsProps) => {
  return (
    <motion.div 
      className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-lg shadow-sm"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3">
        <div className="bg-amber-200 p-1.5 rounded-full text-amber-700">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-amber-800 flex items-center gap-2">
              Hint {currentHint + 1} of {hints.length}
            </h4>
            <div className="flex gap-1">
              {hints.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 w-6 rounded-full ${index <= currentHint ? 'bg-amber-500' : 'bg-amber-200'}`}
                />
              ))}
            </div>
          </div>
          <motion.p 
            className="text-amber-700"
            key={currentHint}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {hints[currentHint]}
          </motion.p>
          {currentHint < hints.length - 1 && (
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onNextHint}
                className="border-amber-200 text-amber-800 hover:text-amber-900 hover:bg-amber-100 flex items-center gap-1"
              >
                Next hint
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeHints;
