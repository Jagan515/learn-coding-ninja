
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, LockKeyhole, PlayCircle } from "lucide-react";

const LearningPath = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Data Structures & Algorithms Learning Path</h2>
        <p className="text-muted-foreground">Master essential DSA concepts and problem-solving techniques</p>
      </div>

      <div className="grid gap-6">
        {[
          {
            title: "Basic Data Structures",
            description: "Arrays, Linked Lists, Stacks, and Queues fundamentals",
            lessons: 6,
            completed: true,
          },
          {
            title: "Searching and Sorting",
            description: "Binary Search, Bubble Sort, Merge Sort, and more",
            lessons: 8,
            completed: true,
          },
          {
            title: "Trees and Graphs",
            description: "Binary Trees, BST, Heaps, and Graph implementations",
            lessons: 7,
            inProgress: true,
            currentLesson: 3,
          },
          {
            title: "Dynamic Programming",
            description: "Breaking down complex problems into simpler subproblems",
            lessons: 5,
            locked: true,
          },
          {
            title: "Advanced Algorithms",
            description: "Greedy algorithms, backtracking, and optimization techniques",
            lessons: 9,
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
