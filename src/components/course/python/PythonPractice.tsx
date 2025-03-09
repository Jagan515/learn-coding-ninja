
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Code, Brain } from "lucide-react";

const PythonPractice = () => {
  const [activeTab, setActiveTab] = useState("basics");

  const practiceCategories = [
    { id: "basics", title: "Python Basics", count: 15 },
    { id: "data-structures", title: "Data Structures", count: 12 },
    { id: "functions", title: "Functions & OOP", count: 10 },
    { id: "algorithms", title: "Algorithms", count: 8 },
  ];

  const practiceItems = [
    {
      id: "p1",
      title: "Variables and Data Types",
      description: "Practice using different data types in Python",
      difficulty: "beginner",
      completed: true,
      category: "basics",
    },
    {
      id: "p2",
      title: "Control Flow Statements",
      description: "Master if/else, loops, and conditional logic",
      difficulty: "beginner",
      completed: true,
      category: "basics",
    },
    {
      id: "p3",
      title: "List Comprehensions",
      description: "Create efficient list operations with comprehensions",
      difficulty: "intermediate",
      completed: false,
      category: "basics",
    },
    {
      id: "p4",
      title: "Dictionary Operations",
      description: "Explore Python dictionaries and their methods",
      difficulty: "intermediate",
      completed: false,
      category: "data-structures",
    },
    {
      id: "p5",
      title: "Classes and Objects",
      description: "Create and use classes in Python",
      difficulty: "intermediate",
      completed: false,
      category: "functions",
    },
    {
      id: "p6",
      title: "Sorting Algorithms",
      description: "Implement and analyze different sorting algorithms",
      difficulty: "advanced",
      completed: false,
      category: "algorithms",
    },
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Beginner</Badge>;
      case "intermediate":
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Intermediate</Badge>;
      case "advanced":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Advanced</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredItems = practiceItems.filter(item => item.category === activeTab);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-semibold mb-4">Python Practice Problems</h2>
        <p className="text-muted-foreground">
          Enhance your Python skills with these practice problems designed to reinforce concepts
          from the course. Each problem focuses on specific aspects of Python programming.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          {practiceCategories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              {category.title}
              <Badge variant="secondary" className="ml-1">{category.count}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {practiceCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <Card key={item.id} className={`transition-all hover:border-primary/50 cursor-pointer ${item.completed ? 'bg-green-50/30 border-green-100' : ''}`}>
                  <CardHeader className="p-4 pb-2 flex-row justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {item.title}
                        {item.completed && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    {getDifficultyBadge(item.difficulty)}
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        {item.completed ? 'Review' : 'Start Practice'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 space-y-4 bg-card rounded-lg shadow-sm">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold">No practice problems found</h3>
                <p className="text-muted-foreground">
                  No practice problems are available for this category yet
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PythonPractice;
