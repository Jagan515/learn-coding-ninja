
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
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-background/50 backdrop-blur-sm border border-border/20 rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                onClick={onRun}
                disabled={isRunning || isDebugging}
                className={cn(
                  "transition-all font-medium",
                  isRunning 
                    ? "animate-pulse bg-primary/90 shadow-inner" 
                    : "bg-gradient-to-r from-primary to-primary hover:opacity-90"
                )}
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Execute code without debugging</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant={isDebugging ? "secondary" : "outline"}
                onClick={onDebug}
                disabled={isRunning || isDebugging}
                className={isDebugging ? "bg-amber-600 hover:bg-amber-700 text-white shadow-inner" : "border-amber-500/50 text-amber-600 hover:text-amber-700 hover:bg-amber-50/50 hover:border-amber-500"}
              >
                <Bug className="h-4 w-4 mr-2" />
                Debug
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">Start GDB-like debugging session</TooltipContent>
          </Tooltip>
          
          {isDebugging && (
            <div className="flex flex-wrap items-center gap-2 animate-fadeIn">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onStepOver}
                    className="border-indigo-500/30 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50/50 hover:border-indigo-500/50"
                  >
                    <StepForward className="h-4 w-4 mr-1" />
                    Step Over
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">Execute current line and move to next line</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onStepInto}
                    className="border-indigo-500/30 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50/50 hover:border-indigo-500/50"
                  >
                    <ArrowDownToLine className="h-4 w-4 mr-1" />
                    Step Into
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">Step into function call on current line</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onStepOut}
                    className="border-indigo-500/30 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50/50 hover:border-indigo-500/50"
                  >
                    <ArrowUpFromLine className="h-4 w-4 mr-1" />
                    Step Out
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">Step out of current function</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={onStopDebug}
                    className="hover:opacity-90"
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">End debugging session</TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              disabled={!hasOutput || isRunning}
              className={cn(
                "border-red-500/30 text-red-600",
                !(!hasOutput || isRunning) && "hover:bg-red-50/50 hover:border-red-500/50"
              )}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">Clear terminal output</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ControlPanel;
