
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Terminal, GitCommit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface OutputTerminalProps {
  output: string;
  isDarkTheme: boolean;
  callStack?: string[];
}

const OutputTerminal = ({ output, isDarkTheme, callStack = [] }: OutputTerminalProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Console Output</h3>
      </div>
      <div className={cn(
        "rounded-lg border-2 overflow-hidden transition-all",
        isDarkTheme 
          ? "bg-[#1A1F2C] border-gray-800" 
          : "bg-gray-50 border-gray-200"
      )}>
        {/* Terminal Header */}
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
            {output ? "Process running" : "Ready"}
          </div>
        </div>

        {/* Terminal Content */}
        <Tabs defaultValue="output" className="w-full">
          {callStack.length > 0 && (
            <TabsList className={cn(
              "w-full justify-start px-2 border-b",
              isDarkTheme ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
            )}>
              <TabsTrigger value="output" className="text-xs">Output</TabsTrigger>
              <TabsTrigger value="callstack" className="text-xs">Call Stack</TabsTrigger>
            </TabsList>
          )}
          
          <TabsContent value="output" className="mt-0">
            <ScrollArea className={cn(
              "h-[200px] font-mono text-sm p-4 transition-colors",
              isDarkTheme 
                ? "bg-[#1A1F2C] text-gray-100" 
                : "bg-gray-50 text-gray-800"
            )}>
              <div className="space-y-1">
                {output ? (
                  output.split('\n').map((line, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "transition-colors",
                        line.includes("Error") 
                          ? "text-red-400"
                          : line.includes("[") 
                            ? "text-blue-400"
                            : line.includes("Output")
                              ? "text-green-400"
                              : isDarkTheme
                                ? "text-gray-300"
                                : "text-gray-700"
                      )}
                    >
                      {line}
                    </div>
                  ))
                ) : (
                  <span className={cn(
                    "italic",
                    isDarkTheme ? "text-gray-500" : "text-gray-400"
                  )}>
                    Terminal output will appear here...
                  </span>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {callStack.length > 0 && (
            <TabsContent value="callstack" className="mt-0">
              <ScrollArea className={cn(
                "h-[200px] font-mono text-sm p-4 transition-colors",
                isDarkTheme 
                  ? "bg-[#1A1F2C] text-gray-100" 
                  : "bg-gray-50 text-gray-800"
              )}>
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground">Call Stack (most recent call first)</div>
                  {callStack.map((call, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5 rounded",
                        index === 0
                          ? isDarkTheme ? "bg-blue-950/30" : "bg-blue-50"
                          : ""
                      )}
                    >
                      <GitCommit className="h-3 w-3 text-muted-foreground" />
                      <span className={cn(
                        index === 0
                          ? isDarkTheme ? "text-blue-400 font-medium" : "text-blue-700 font-medium"
                          : isDarkTheme ? "text-gray-300" : "text-gray-700"
                      )}>
                        {call} {index === 0 && "(current)"}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default OutputTerminal;
