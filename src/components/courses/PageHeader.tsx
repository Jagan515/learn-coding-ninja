
import { motion } from "framer-motion";
import { BookOpen, Code, Star } from "lucide-react";

const PageHeader = () => {
  return (
    <div className="py-10 mb-12">
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block mb-3">
          <div className="flex items-center justify-center gap-4 mb-5">
            <motion.span 
              className="h-12 w-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <BookOpen className="h-6 w-6 text-primary" />
            </motion.span>
            <motion.span 
              className="h-12 w-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Code className="h-6 w-6 text-accent" />
            </motion.span>
            <motion.span 
              className="h-12 w-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Star className="h-6 w-6 text-primary" />
            </motion.span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Explore Our Programming Courses
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn from expertly crafted courses and advance your programming skills
          with hands-on practice and AI assistance
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground pt-3">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            Python
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            JavaScript
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            C++
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20"
          >
            Java
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            Data Structures
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default PageHeader;
