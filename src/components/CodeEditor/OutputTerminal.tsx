
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

interface OutputTerminalProps {
  output: string;
  isDarkTheme: boolean;
}

const OutputTerminal = ({ output, isDarkTheme }: OutputTerminalProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Output Terminal</h3>
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
      </div>
    </div>
  );
};

export default OutputTerminal;
