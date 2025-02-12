
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Clock } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  progress: number;
  lessons: number;
  onClick: () => void;
}

const CourseCard = ({
  title,
  description,
  level,
  duration,
  progress,
  lessons,
  onClick,
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card 
      className="card-hover cursor-pointer overflow-hidden" 
      onClick={onClick}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <span 
            className={`text-xs font-medium px-2.5 py-0.5 rounded ${getLevelColor(level)}`}
          >
            {level}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Book className="w-4 h-4" />
          <span>{lessons} lessons</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
