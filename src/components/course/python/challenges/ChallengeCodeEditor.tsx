
import { Button } from "@/components/ui/button";
import { Info, Play } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Solution</h3>
      <div className="border rounded-lg overflow-hidden">
        <CodeMirror
          value={code}
          height="300px"
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
          className="flex items-center gap-2"
        >
          {running ? "Running..." : "Run Code"}
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChallengeCodeEditor;
