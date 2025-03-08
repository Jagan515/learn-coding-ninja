
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f0f4ff] to-[#e3eaff]">
      <div className="absolute inset-0 bg-hero-pattern opacity-10 z-0"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-1000 opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center space-y-8 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Learn to Code,{" "}
            <span className="gradient-text">Build Your Future</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Master programming with our comprehensive courses. From beginner to advanced, 
            learn at your own pace with interactive lessons and hands-on practice.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all">
              Start Learning
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/30 border-white/50 hover:bg-white/50 transition-all">
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
