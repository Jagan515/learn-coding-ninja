
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bug } from "lucide-react";

interface DebugPanelProps {
  variables: Record<string, any>;
  isDarkTheme: boolean;
}

const DebugPanel = ({ variables, isDarkTheme }: DebugPanelProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Bug className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">Variables</h3>
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
        </div>

        {/* Debug Content */}
        <ScrollArea className={cn(
          "h-[200px] font-mono text-sm p-4 transition-colors",
          isDarkTheme 
            ? "bg-[#1A1F2C] text-gray-100" 
            : "bg-gray-50 text-gray-800"
        )}>
          <div className="space-y-1">
            {Object.entries(variables).map(([key, value]) => (
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
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DebugPanel;
