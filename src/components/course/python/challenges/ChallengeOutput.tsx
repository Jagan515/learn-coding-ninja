
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Bot, Star, BrainCircuit, Code, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChallengeOutputProps {
  runOutput: string | null;
  allTestsPassed: boolean;
}

const ChallengeOutput = ({ runOutput, allTestsPassed }: ChallengeOutputProps) => {
  if (!runOutput) return null;
  
  // Format for Claude AI feedback - this mimics real AI integration
  if (allTestsPassed) {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-green-50 border-green-100 shadow-sm">
            <AlertDescription className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <span className="text-green-700">
                {runOutput}
              </span>
            </AlertDescription>
          </Alert>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-blue-800">Claude AI Analysis</h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-blue-700 mb-3">Great job! Your solution is correct and efficient. Here's what you did well:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { icon: <Code className="h-4 w-4" />, text: "Proper algorithm implementation" },
                    { icon: <BrainCircuit className="h-4 w-4" />, text: "Good variable naming" },
                    { icon: <CheckCircle className="h-4 w-4" />, text: "Efficient code structure" },
                    { icon: <Star className="h-4 w-4" />, text: "Excellent problem-solving approach" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white bg-opacity-50 p-2 rounded border border-blue-50">
                      <span className="text-blue-600">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-blue-700 mb-3">For further optimization, consider:</p>
                <ul className="list-disc pl-5 space-y-1 text-blue-700 mb-4">
                  <li>Time complexity optimization for larger inputs</li>
                  <li>Adding comments to explain complex logic</li>
                </ul>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    Practice similar challenges
                  </Button>
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    Next challenge
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="bg-amber-50 border-amber-100 shadow-sm">
            <AlertDescription className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <span className="text-amber-700">
                {runOutput}
              </span>
            </AlertDescription>
          </Alert>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-800 mb-2">Claude AI Suggestions</h4>
                <p className="text-blue-700 mb-3">Your solution is on the right track but has some issues. Here are some hints:</p>
                <div className="p-4 bg-white rounded-lg border border-blue-100 mb-4">
                  <div className="space-y-3">
                    {[
                      "Check your loop conditions - your loop might be stopping too early",
                      "Make sure you're handling all test cases including edge cases",
                      "Review your algorithm's logic for handling empty inputs",
                      "Consider using a different approach for calculating the average"
                    ].map((hint, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <p className="text-slate-700">{hint}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="text-blue-700 mb-4">Try debugging by adding print statements to track variable values through your function's execution.</p>
                <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  Ask Claude for more help
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default ChallengeOutput;
