
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const DSACourseIntro = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Data Structures & Algorithms</h2>
        <p className="text-muted-foreground">
          This advanced course covers essential data structures and algorithms used in software development.
          You'll learn to implement, analyze, and optimize various algorithms across multiple programming languages,
          preparing you for technical interviews and efficient real-world programming.
        </p>
      </div>

      <h3 className="text-xl font-semibold">What You'll Learn</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          "Array and string algorithms",
          "Linked lists, stacks, and queues",
          "Trees, graphs, and heaps",
          "Hashing and hash tables",
          "Searching and sorting algorithms",
          "Dynamic programming",
          "Greedy algorithms",
          "Big O notation and algorithm analysis",
        ].map((item, index) => (
          <li key={index} className="flex items-center gap-2 bg-card p-3 rounded-lg border">
            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Course Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg border text-center">
            <p className="text-muted-foreground text-sm">Duration</p>
            <p className="text-xl font-medium">20 weeks</p>
          </div>
          <div className="p-4 bg-card rounded-lg border text-center">
            <p className="text-muted-foreground text-sm">Difficulty</p>
            <p className="text-xl font-medium">Intermediate to Advanced</p>
          </div>
          <div className="p-4 bg-card rounded-lg border text-center">
            <p className="text-muted-foreground text-sm">Practice Problems</p>
            <p className="text-xl font-medium">100+</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Languages Supported</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["Python", "Java", "C++", "JavaScript"].map((lang, index) => (
            <div key={index} className="p-3 bg-card rounded-lg border text-center">
              <p className="font-medium">{lang}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">AI Integration</h3>
        <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
          <p className="text-muted-foreground">
            This course is enhanced with Claude AI integration to provide personalized learning
            experiences. You'll receive:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Algorithm visualization and explanation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Personalized problem-solving strategies</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Complexity analysis guidance</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Interview preparation assistance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 text-white">
          Start Learning Now
        </Button>
      </div>
    </div>
  );
};

export default DSACourseIntro;
