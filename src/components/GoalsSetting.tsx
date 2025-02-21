
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Target, Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Goal {
  id: string;
  title: string;
  targetDate: Date;
  completed: boolean;
}

const GoalsSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [date, setDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = () => {
    if (newGoal && date) {
      const goal: Goal = {
        id: Math.random().toString(36).substr(2, 9),
        title: newGoal,
        targetDate: date,
        completed: false,
      };
      setGoals([...goals, goal]);
      setNewGoal("");
      setDate(undefined);
      setIsDialogOpen(false);
    }
  };

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Target className="mr-2 h-4 w-4" />
            Set New Learning Goal
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set a New Learning Goal</DialogTitle>
            <DialogDescription>
              Define your learning objective and target completion date
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your learning goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a target date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button 
              className="w-full" 
              onClick={handleAddGoal}
              disabled={!newGoal || !date}
            >
              Add Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between p-4 bg-card rounded-lg border"
          >
            <div className="space-y-1">
              <p className={cn("font-medium", goal.completed && "line-through text-muted-foreground")}>
                {goal.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Target: {format(goal.targetDate, "PPP")}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleGoalCompletion(goal.id)}
            >
              {goal.completed ? "Undo" : "Complete"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsSetting;
