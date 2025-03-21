
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Clock, Code, GraduationCap, Users } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  progress: number;
  lessons: number;
  language: string;
  onClick: () => void;
}

const CourseCard = ({
  title,
  description,
  level,
  duration,
  progress,
  lessons,
  language,
  onClick,
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return <GraduationCap className="w-4 h-4" />;
      case "intermediate":
        return <Users className="w-4 h-4" />;
      case "advanced":
        return <Code className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-8px] bg-white/80 backdrop-blur-sm border border-white/40" 
      onClick={onClick}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader className="space-y-1 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getLevelIcon(level)}
            <span 
              className={`text-xs font-medium px-2.5 py-0.5 rounded ${getLevelColor(level)}`}
            >
              {level}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
        </div>
        <h3 className="text-xl font-semibold tracking-tight line-clamp-2">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>{language}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-muted/30" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
