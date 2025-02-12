
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Learn to Code,{" "}
            <span className="text-primary">Build Your Future</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Master programming with our comprehensive courses. From beginner to advanced, 
            learn at your own pace with interactive lessons and hands-on practice.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="group">
              Start Learning
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
    </div>
  );
};

export default Hero;
