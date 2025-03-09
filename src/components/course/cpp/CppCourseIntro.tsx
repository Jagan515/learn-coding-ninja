
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const CppCourseIntro = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-semibold mb-4">Welcome to C++ Programming</h2>
        <p className="text-muted-foreground">
          This comprehensive course will take you from a beginner to an advanced C++ developer.
          You'll learn everything from basic syntax to complex applications, memory management,
          STL, and modern C++ features with practical exercises and hands-on coding challenges.
        </p>
      </div>

      <h3 className="text-xl font-semibold">What You'll Learn</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          "C++ fundamentals and syntax",
          "Memory management and pointers",
          "Object-oriented programming",
          "Standard Template Library (STL)",
          "Modern C++ features (C++11/14/17/20)",
          "Multithreading and concurrency",
          "Data structures implementation",
          "Design patterns and best practices",
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
            <p className="text-xl font-medium">15 weeks</p>
          </div>
          <div className="p-4 bg-card rounded-lg border text-center">
            <p className="text-muted-foreground text-sm">Difficulty</p>
            <p className="text-xl font-medium">Beginner to Advanced</p>
          </div>
          <div className="p-4 bg-card rounded-lg border text-center">
            <p className="text-muted-foreground text-sm">Practice Exercises</p>
            <p className="text-xl font-medium">60+</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">AI Integration</h3>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-muted-foreground">
            This course is enhanced with Claude AI integration to provide personalized learning
            experiences. You'll receive:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Real-time feedback on your code</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Personalized hints when you're stuck</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Dynamic practice problems tailored to your level</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Ask any C++ question and get immediate answers</span>
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

export default CppCourseIntro;
