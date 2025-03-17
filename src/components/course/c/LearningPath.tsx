
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, LockKeyhole, PlayCircle } from "lucide-react";

const LearningPath = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">C Programming Learning Path</h2>
        <p className="text-muted-foreground">Master the fundamentals of C programming with our structured learning path</p>
      </div>

      <div className="grid gap-6">
        {[
          {
            title: "Introduction to C",
            description: "Learn the basics of C programming language and environment setup",
            lessons: 5,
            completed: true,
          },
          {
            title: "Variables and Data Types",
            description: "Understanding variables, data types, and memory management in C",
            lessons: 4,
            completed: true,
          },
          {
            title: "Control Structures",
            description: "Master if-else statements, loops, and other control structures",
            lessons: 6,
            inProgress: true,
            currentLesson: 3,
          },
          {
            title: "Functions and Pointers",
            description: "Learn about functions, parameters, and memory addresses",
            lessons: 8,
            locked: true,
          },
          {
            title: "Arrays and Strings",
            description: "Working with collections of data and text manipulation",
            lessons: 7,
            locked: true,
          }
        ].map((module, index) => (
          <Card key={index} className={module.locked ? "opacity-80" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                {module.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : module.locked ? (
                  <LockKeyhole className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {module.currentLesson}/{module.lessons} complete
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{module.lessons} lessons</span>
                {!module.locked && (
                  <Button size="sm" variant={module.completed ? "outline" : "default"}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {module.completed ? "Review" : "Continue"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
