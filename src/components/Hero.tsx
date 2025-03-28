
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f0f4ff] to-[#e3eaff] py-20">
      <div className="absolute inset-0 bg-hero-pattern opacity-10 z-0"></div>
      
      {/* Animated shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-70"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-1000 opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Learn to Code,{" "}
              <span className="gradient-text">Build Your Future</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Master programming with our comprehensive courses. From beginner to advanced, 
              learn at your own pace with interactive lessons and hands-on practice.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all">
                Start Learning
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/30 border-white/50 hover:bg-white/50 transition-all">
                Browse Courses
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                  alt="Person coding on laptop" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white font-medium">Start your coding journey today</p>
                </div>
              </div>
              
              <div className="absolute -right-4 -bottom-4 bg-white shadow-lg rounded-lg p-4 w-32 h-32 flex flex-col items-center justify-center text-center animate-bounce-slow">
                <p className="text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-muted-foreground">Interactive Courses</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
