
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bug, Eye, Code, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { ProgrammingLanguage } from "./LanguageSelector";

interface DebugPanelProps {
  variables: Record<string, any>;
  isDarkTheme: boolean;
  breakpoints: number[];
  currentLine: number;
  callStack: string[];
  language: ProgrammingLanguage;
  onAddBreakpoint: (line: number) => void;
  onRemoveBreakpoint: (line: number) => void;
  onWatchVariable: (variable: string) => void;
}

const DebugPanel = ({ 
  variables, 
  isDarkTheme, 
  breakpoints,
  currentLine,
  callStack,
  language,
  onAddBreakpoint,
  onRemoveBreakpoint,
  onWatchVariable
}: DebugPanelProps) => {
  const [newBreakpoint, setNewBreakpoint] = useState("");
  const [newWatch, setNewWatch] = useState("");

  const handleAddBreakpoint = () => {
    const line = parseInt(newBreakpoint);
    if (!isNaN(line) && line > 0) {
      onAddBreakpoint(line);
      setNewBreakpoint("");
    }
  };

  const handleAddWatch = () => {
    if (newWatch.trim()) {
      onWatchVariable(newWatch.trim());
      setNewWatch("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Bug className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Debugger</h3>
      </div>
      <div className={cn(
        "rounded-lg border-2 overflow-hidden transition-all",
        isDarkTheme 
          ? "bg-[#1A1F2C] border-gray-800" 
          : "bg-gray-50 border-gray-200"
      )}>
        {/* Debug Header */}
        <div className={cn(
          "px-4 py-2 flex items-center gap-2 border-b-2",
          isDarkTheme ? "border-gray-800" : "border-gray-200"
        )}>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className={cn(
            "text-xs font-mono ml-2 px-2 py-0.5 rounded",
            isDarkTheme 
              ? "bg-gray-800 text-gray-400" 
              : "bg-gray-200 text-gray-600"
          )}>
            Debug Inspector
          </div>
          <div className="ml-auto text-xs">
            {currentLine > 0 && 
              <span className={isDarkTheme ? "text-green-400" : "text-green-600"}>
                Line: {currentLine}
              </span>
            }
          </div>
        </div>

        {/* Debug Content */}
        <Tabs defaultValue="variables" className="w-full">
          <TabsList className={cn(
            "w-full border-b",
            isDarkTheme ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
          )}>
            <TabsTrigger value="variables" className="text-xs flex items-center gap-1">
              <Eye size={12} />
              Variables
            </TabsTrigger>
            <TabsTrigger value="breakpoints" className="text-xs flex items-center gap-1">
              <Activity size={12} />
              Breakpoints
            </TabsTrigger>
            <TabsTrigger value="watches" className="text-xs flex items-center gap-1">
              <Code size={12} />
              Watches
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="variables">
            <ScrollArea className={cn(
              "h-[200px] font-mono text-sm p-4 transition-colors",
              isDarkTheme 
                ? "bg-[#1A1F2C] text-gray-100" 
                : "bg-gray-50 text-gray-800"
            )}>
              <div className="space-y-1">
                {Object.entries(variables).length > 0 ? (
                  Object.entries(variables).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      <span className={cn(
                        "transition-colors",
                        isDarkTheme ? "text-blue-400" : "text-blue-600"
                      )}>
                        {key}
                      </span>
                      <span className={cn(
                        "transition-colors",
                        isDarkTheme ? "text-gray-400" : "text-gray-500"
                      )}> = </span>
                      <span className={cn(
                        "transition-colors",
                        isDarkTheme ? "text-green-400" : "text-green-600"
                      )}>
                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground italic">No variables to display</div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="breakpoints">
            <div className={cn(
              "p-4 transition-colors",
              isDarkTheme 
                ? "bg-[#1A1F2C] text-gray-100" 
                : "bg-gray-50 text-gray-800"
            )}>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newBreakpoint}
                  onChange={(e) => setNewBreakpoint(e.target.value)}
                  placeholder="Line number"
                  className="text-xs"
                  type="number"
                  min="1"
                />
                <Button 
                  size="sm" 
                  onClick={handleAddBreakpoint}
                  className="text-xs"
                >
                  Add
                </Button>
              </div>
              
              <Separator className="my-2" />
              
              <ScrollArea className="h-[140px] font-mono text-sm">
                <div className="space-y-1">
                  {breakpoints.length > 0 ? (
                    breakpoints.map((line) => (
                      <div key={line} className="flex justify-between items-center mb-1 px-2 py-1 rounded bg-gray-800/20">
                        <span className={cn(
                          "transition-colors",
                          isDarkTheme ? "text-red-400" : "text-red-600"
                        )}>
                          Breakpoint at line {line}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onRemoveBreakpoint(line)}
                          className="h-6 w-6 p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground italic">No breakpoints set</div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="watches">
            <div className={cn(
              "p-4 transition-colors",
              isDarkTheme 
                ? "bg-[#1A1F2C] text-gray-100" 
                : "bg-gray-50 text-gray-800"
            )}>
              <div className="flex gap-2 mb-4">
                <Input
                  value={newWatch}
                  onChange={(e) => setNewWatch(e.target.value)}
                  placeholder="Variable name"
                  className="text-xs"
                />
                <Button 
                  size="sm" 
                  onClick={handleAddWatch}
                  className="text-xs"
                >
                  Watch
                </Button>
              </div>
              
              <ScrollArea className="h-[140px] font-mono text-sm">
                <div className="text-muted-foreground italic">
                  Enter variable names to watch during execution
                </div>
                {/* Show call stack */}
                {callStack.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold mb-1">Call Stack ({language}):</h4>
                    <div className="pl-2 border-l-2 border-gray-600 space-y-1">
                      {callStack.map((call, index) => (
                        <div key={index} className="text-xs">
                          <span className="text-gray-400">{index}: </span>
                          <span className={isDarkTheme ? "text-cyan-400" : "text-cyan-600"}>
                            {call}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DebugPanel;
