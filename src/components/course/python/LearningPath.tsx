
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Play, BookOpen, FileText } from "lucide-react";

const modules = [
  {
    id: "module-1",
    title: "Getting Started with Python",
    completed: true,
    unlocked: true,
    description: "Learn Python basics, installation, and your first program",
    lessons: [
      { id: "1-1", title: "Introduction to Python", type: "video", completed: true, duration: "8 min" },
      { id: "1-2", title: "Installing Python", type: "text", completed: true, duration: "5 min" },
      { id: "1-3", title: "Your First Python Program", type: "video", completed: true, duration: "12 min" },
      { id: "1-4", title: "Python Syntax Basics", type: "text", completed: true, duration: "10 min" },
    ]
  },
  {
    id: "module-2",
    title: "Python Data Types",
    completed: false,
    unlocked: true,
    description: "Master Python's built-in data types and operations",
    lessons: [
      { id: "2-1", title: "Numbers and Math Operations", type: "video", completed: true, duration: "15 min" },
      { id: "2-2", title: "Strings and Text Manipulation", type: "text", completed: true, duration: "12 min" },
      { id: "2-3", title: "Lists and Tuples", type: "video", completed: false, duration: "18 min" },
      { id: "2-4", title: "Dictionaries and Sets", type: "text", completed: false, duration: "14 min" },
    ]
  },
  {
    id: "module-3",
    title: "Control Flow",
    completed: false,
    unlocked: false,
    description: "Learn how to control program execution with conditions and loops",
    lessons: [
      { id: "3-1", title: "Conditional Statements", type: "video", completed: false, duration: "14 min" },
      { id: "3-2", title: "For Loops", type: "text", completed: false, duration: "10 min" },
      { id: "3-3", title: "While Loops", type: "video", completed: false, duration: "12 min" },
      { id: "3-4", title: "Break and Continue", type: "text", completed: false, duration: "8 min" },
    ]
  },
  {
    id: "module-4",
    title: "Functions and Modules",
    completed: false,
    unlocked: false,
    description: "Create reusable code with functions and organize with modules",
    lessons: [
      { id: "4-1", title: "Defining Functions", type: "video", completed: false, duration: "15 min" },
      { id: "4-2", title: "Function Parameters", type: "text", completed: false, duration: "12 min" },
      { id: "4-3", title: "Return Values", type: "video", completed: false, duration: "10 min" },
      { id: "4-4", title: "Importing Modules", type: "text", completed: false, duration: "14 min" },
    ]
  },
];

const LearningPath = () => {
  const [expandedModule, setExpandedModule] = useState<string | null>("module-2");

  const getLessonIcon = (type: string) => {
    if (type === "video") return <Play className="h-4 w-4 text-blue-500" />;
    return <FileText className="h-4 w-4 text-orange-500" />;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold">Your Learning Path</h2>
      <p className="text-muted-foreground">
        Follow this structured path to master Python programming from the ground up.
        Complete each module to unlock the next one.
      </p>

      <div className="space-y-4">
        <Accordion
          type="single"
          collapsible
          value={expandedModule || undefined}
          onValueChange={(value) => setExpandedModule(value)}
          className="w-full"
        >
          {modules.map((module) => (
            <AccordionItem 
              key={module.id} 
              value={module.id}
              className={`border rounded-lg mb-4 overflow-hidden ${
                !module.unlocked ? "opacity-75" : ""
              }`}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      module.completed 
                        ? "bg-green-100" 
                        : module.unlocked 
                          ? "bg-blue-100" 
                          : "bg-gray-100"
                    }`}>
                      {module.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : module.unlocked ? (
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-muted-foreground text-sm">{module.description}</p>
                    </div>
                  </div>
                  {module.completed && (
                    <span className="text-sm font-medium text-green-600 hidden sm:block">
                      Completed
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 pb-4 pt-2 space-y-3">
                  {module.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        lesson.completed 
                          ? "bg-green-50 border-green-100" 
                          : "bg-card hover:bg-accent/50 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        ) : (
                          getLessonIcon(lesson.type)
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        {!lesson.completed && module.unlocked && (
                          <Button size="sm" variant="ghost" className="h-7 px-2">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg">Continue Learning</Button>
      </div>
    </div>
  );
};

export default LearningPath;
