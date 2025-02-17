
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Progress } from "../ui/progress";

interface MemoryStats {
  heapUsed: number;
  heapTotal: number;
  timeElapsed: number;
  cpuUsage: number;
}

interface MemoryPanelProps {
  stats: MemoryStats;
  isDarkTheme: boolean;
}

const MemoryPanel = ({ stats, isDarkTheme }: MemoryPanelProps) => {
  const heapPercentage = (stats.heapUsed / stats.heapTotal) * 100;
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Memory & Performance</h3>
      <ScrollArea className={cn(
        "h-[200px] w-full rounded-md border-2 p-4 transition-colors",
        isDarkTheme 
          ? "bg-gray-900/50 border-gray-800 text-gray-100" 
          : "bg-gray-50 border-gray-200 text-gray-800"
      )}>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Heap Usage</span>
              <span>{Math.round(heapPercentage)}%</span>
            </div>
            <Progress value={heapPercentage} />
            <div className="text-xs text-muted-foreground">
              {Math.round(stats.heapUsed / 1024 / 1024)}MB / {Math.round(stats.heapTotal / 1024 / 1024)}MB
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>CPU Usage</span>
              <span>{Math.round(stats.cpuUsage)}%</span>
            </div>
            <Progress value={stats.cpuUsage} />
          </div>
          
          <div className="space-y-1">
            <div className="text-sm">Execution Time</div>
            <div className="text-2xl font-mono">
              {stats.timeElapsed.toFixed(2)}ms
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MemoryPanel;
