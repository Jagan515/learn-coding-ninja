import { Button } from "../ui/button";
import { Play, Bug, StepForward, ArrowDownToLine, ArrowUpFromLine, Pause, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ControlPanelProps {
  onRun: () => void;
  onDebug: () => void;
  onStepOver: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
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
  onStepInto,
  onStepOut,
  onStopDebug,
  onClear,
  isRunning,
  isDebugging,
  hasOutput,
}: ControlPanelProps) => {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>Execute code without debugging</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isDebugging ? "secondary" : "outline"}
                onClick={onDebug}
                disabled={isRunning || isDebugging}
                className={isDebugging ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}
              >
                <Bug className="h-4 w-4 mr-2" />
                Debug
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start GDB-like debugging session</TooltipContent>
          </Tooltip>
          
          {isDebugging && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onStepOver}
                  >
                    <StepForward className="h-4 w-4 mr-2" />
                    Step Over
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Execute current line and move to next line</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onStepInto}
                  >
                    <ArrowDownToLine className="h-4 w-4 mr-2" />
                    Step Into
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Step into function call on current line</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onStepOut}
                  >
                    <ArrowUpFromLine className="h-4 w-4 mr-2" />
                    Step Out
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Step out of current function</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={onStopDebug}
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                </TooltipTrigger>
                <TooltipContent>End debugging session</TooltipContent>
              </Tooltip>
            </>
          )}
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              disabled={!hasOutput || isRunning}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear terminal output</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ControlPanel;
