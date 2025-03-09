
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, CircleDot, Circle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const LearningPath = () => {
  // Mock data for the learning path sections
  const sections = [
    {
      id: "section-1",
      title: "Getting Started with C++",
      completed: true,
      lessons: [
        { id: "lesson-1-1", title: "Introduction to C++", duration: "15 min", completed: true },
        { id: "lesson-1-2", title: "Setting Up Your Development Environment", duration: "20 min", completed: true },
        { id: "lesson-1-3", title: "Your First C++ Program", duration: "25 min", completed: true },
        { id: "lesson-1-4", title: "Understanding Basic Syntax", duration: "30 min", completed: true },
      ]
    },
    {
      id: "section-2",
      title: "C++ Fundamentals",
      completed: false,
      lessons: [
        { id: "lesson-2-1", title: "Variables and Data Types", duration: "25 min", completed: true },
        { id: "lesson-2-2", title: "Operators and Expressions", duration: "30 min", completed: true },
        { id: "lesson-2-3", title: "Control Flow Statements", duration: "35 min", completed: false },
        { id: "lesson-2-4", title: "Functions in C++", duration: "40 min", completed: false },
      ]
    },
    {
      id: "section-3",
      title: "Memory Management",
      completed: false,
      locked: true,
      lessons: [
        { id: "lesson-3-1", title: "Introduction to Pointers", duration: "30 min", completed: false },
        { id: "lesson-3-2", title: "Dynamic Memory Allocation", duration: "35 min", completed: false },
        { id: "lesson-3-3", title: "Smart Pointers", duration: "40 min", completed: false },
        { id: "lesson-3-4", title: "Memory Leaks and How to Avoid Them", duration: "30 min", completed: false },
      ]
    },
    {
      id: "section-4",
      title: "Object-Oriented Programming",
      completed: false,
      locked: true,
      lessons: [
        { id: "lesson-4-1", title: "Classes and Objects", duration: "35 min", completed: false },
        { id: "lesson-4-2", title: "Inheritance and Polymorphism", duration: "40 min", completed: false },
        { id: "lesson-4-3", title: "Encapsulation and Abstraction", duration: "30 min", completed: false },
        { id: "lesson-4-4", title: "Constructors and Destructors", duration: "35 min", completed: false },
      ]
    },
    {
      id: "section-5",
      title: "Standard Template Library (STL)",
      completed: false,
      locked: true,
      lessons: [
        { id: "lesson-5-1", title: "Introduction to STL", duration: "25 min", completed: false },
        { id: "lesson-5-2", title: "Containers and Iterators", duration: "40 min", completed: false },
        { id: "lesson-5-3", title: "Algorithms", duration: "45 min", completed: false },
        { id: "lesson-5-4", title: "Function Objects", duration: "30 min", completed: false },
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-xl font-semibold">Course Learning Path</h2>
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id} className={section.locked ? "opacity-60" : ""}>
              <AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-md">
                <div className="flex items-center gap-3 text-left">
                  {section.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : section.locked ? (
                    <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  )}
                  <span>{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4">
                <ul className="space-y-3 ml-6">
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id} className={`flex items-center justify-between ${section.locked ? "cursor-not-allowed" : "cursor-pointer hover:bg-muted/30"} p-2 rounded-md`}>
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : section.locked ? (
                          <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <CircleDot className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
                {!section.locked && (
                  <Button className="mt-4 ml-6" variant="outline" size="sm">
                    {section.completed ? "Review Section" : "Continue Learning"}
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default LearningPath;
