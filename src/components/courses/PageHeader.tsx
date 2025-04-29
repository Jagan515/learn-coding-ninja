
import { motion } from "framer-motion";
import { BookOpen, Code, Star } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="py-8 mb-12">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block mb-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-10 w-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </span>
            <span className="h-10 w-10 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
              <Code className="h-5 w-5 text-accent" />
            </span>
            <span className="h-10 w-10 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-primary" />
            </span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Explore Our Programming Courses
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn from expertly crafted courses and advance your programming skills
          with hands-on practice and AI assistance
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground pt-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Python</span>
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent">JavaScript</span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">C++</span>
          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent">Java</span>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">Data Structures</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PageHeader;
