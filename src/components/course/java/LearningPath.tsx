
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, LockKeyhole, PlayCircle } from "lucide-react";

const LearningPath = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Java Programming Learning Path</h2>
        <p className="text-muted-foreground">Master Java programming from fundamentals to advanced concepts</p>
      </div>

      <div className="grid gap-6">
        {[
          {
            title: "Java Fundamentals",
            description: "Learn about Java syntax, variables, and basic OOP concepts",
            lessons: 8,
            completed: true,
          },
          {
            title: "Object-Oriented Programming",
            description: "Master classes, inheritance, polymorphism, and encapsulation",
            lessons: 7,
            completed: true,
          },
          {
            title: "Java Collections Framework",
            description: "Learn to use Lists, Sets, Maps, and other collection types",
            lessons: 6,
            inProgress: true,
            currentLesson: 4,
          },
          {
            title: "Exception Handling",
            description: "Handle errors gracefully with try-catch blocks and custom exceptions",
            lessons: 4,
            locked: true,
          },
          {
            title: "Java Streams and Lambdas",
            description: "Functional programming concepts in Java 8 and beyond",
            lessons: 5,
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
