
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock } from "lucide-react";

interface CourseProgressProps {
  completedLessons: number;
  totalLessons: number;
  estimatedHours: number;
}

const CourseProgress = ({ completedLessons, totalLessons, estimatedHours }: CourseProgressProps) => {
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <CheckCircle2 className="h-4 w-4" />
          <span>{completedLessons}/{totalLessons} lessons</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{estimatedHours}h</span>
        </div>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default CourseProgress;
