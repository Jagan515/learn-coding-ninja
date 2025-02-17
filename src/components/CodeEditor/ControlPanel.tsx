
import { Button } from "../ui/button";
import { Play, Bug, StepForward, Pause, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  onRun: () => void;
  onDebug: () => void;
  onStepOver: () => void;
  onStopDebug: () => void;
  onClear: () => void;
  isRunning: boolean;
  isDebugging: boolean;
  hasOutput: boolean;
}

const ControlPanel = ({
  onRun,
  onDebug,
  onStepOver,
  onStopDebug,
  onClear,
  isRunning,
  isDebugging,
  hasOutput,
}: ControlPanelProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onRun}
          disabled={isRunning || isDebugging}
          className={cn(
            "transition-all",
            isRunning && "animate-pulse bg-primary/90"
          )}
        >
          <Play className="h-4 w-4 mr-2" />
          {isRunning ? "Running..." : "Run"}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={onDebug}
          disabled={isRunning || isDebugging}
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
        {isDebugging && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={onStepOver}
            >
              <StepForward className="h-4 w-4 mr-2" />
              Step Over
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onStopDebug}
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        disabled={!hasOutput || isRunning}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear
      </Button>
    </div>
  );
};

export default ControlPanel;
