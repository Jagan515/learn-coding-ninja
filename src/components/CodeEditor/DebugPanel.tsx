
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface DebugPanelProps {
  variables: Record<string, any>;
  isDarkTheme: boolean;
}

const DebugPanel = ({ variables, isDarkTheme }: DebugPanelProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Variables</h3>
      <ScrollArea className={cn(
        "h-[200px] w-full rounded-md border-2 p-4 transition-colors font-mono",
        isDarkTheme 
          ? "bg-gray-900/50 border-gray-800 text-gray-100" 
          : "bg-gray-50 border-gray-200 text-gray-800"
      )}>
        <pre className="text-sm">
          {Object.entries(variables).map(([key, value]) => (
            <div key={key} className="mb-1">
              <span className="text-blue-500">{key}</span>
              <span className="text-gray-500"> = </span>
              <span className="text-green-500">
                {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
              </span>
            </div>
          ))}
        </pre>
      </ScrollArea>
    </div>
  );
};

export default DebugPanel;
