
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface OutputTerminalProps {
  output: string;
  isDarkTheme: boolean;
}

const OutputTerminal = ({ output, isDarkTheme }: OutputTerminalProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Output Terminal</h3>
      <ScrollArea className={cn(
        "h-[200px] w-full rounded-md border-2 p-4 transition-colors font-mono",
        isDarkTheme 
          ? "bg-gray-900/50 border-gray-800 text-gray-100" 
          : "bg-gray-50 border-gray-200 text-gray-800"
      )}>
        <pre className="text-sm whitespace-pre-wrap">
          {output || (
            <span className="text-muted-foreground italic">
              Terminal output will appear here...
            </span>
          )}
        </pre>
      </ScrollArea>
    </div>
  );
};

export default OutputTerminal;
