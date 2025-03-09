
import { Button } from "@/components/ui/button";
import { Info, Play, Save, Download, Upload, RefreshCw } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { motion } from "framer-motion";

interface ChallengeCodeEditorProps {
  code: string;
  onCodeChange: (value: string) => void;
  onRun: () => void;
  onToggleHints: () => void;
  showHints: boolean;
  running: boolean;
}

const ChallengeCodeEditor = ({
  code,
  onCodeChange,
  onRun,
  onToggleHints,
  showHints,
  running,
}: ChallengeCodeEditorProps) => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Solution</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <div className="bg-slate-800 px-4 py-2 flex justify-between items-center">
          <span className="text-slate-200 text-sm font-medium">Python</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-200 hover:text-white hover:bg-slate-700">
              <Download className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-slate-200 hover:text-white hover:bg-slate-700">
              <Upload className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <CodeMirror
          value={code}
          height="320px"
          theme={vscodeDark}
          extensions={[python()]}
          onChange={onCodeChange}
          className="text-sm"
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onToggleHints}
          className="flex items-center gap-2"
        >
          <Info className="h-4 w-4" />
          {showHints ? "Hide Hints" : "Show Hints"}
        </Button>
        
        <Button 
          onClick={onRun}
          disabled={running}
          className={`flex items-center gap-2 ${!running ? 'bg-gradient-to-r from-green-500 to-emerald-600' : ''}`}
        >
          {running ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              Run Code
              <Play className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default ChallengeCodeEditor;
