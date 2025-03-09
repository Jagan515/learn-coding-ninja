
import { Button } from "@/components/ui/button";
import { CheckCircle2, Book, Star, Brain, Code, GraduationCap, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PythonCourseIntro = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="p-8 bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 rounded-xl border border-blue-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Welcome to Python Programming</h2>
            <p className="text-muted-foreground text-lg">
              This comprehensive course will take you from a complete beginner to an advanced Python developer. 
              You'll learn everything from basic syntax to complex applications, with hands-on exercises, 
              quizzes, and coding challenges along the way.
            </p>
            <div className="mt-6">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                Start Learning Now
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 relative">
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-medium px-3 py-1 rounded-full text-sm flex items-center gap-1.5 shadow-sm">
              <Star className="h-4 w-4 fill-yellow-900" />
              <span>AI-Powered</span>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80" 
              alt="Python Programming" 
              className="rounded-lg shadow-lg object-cover aspect-video"
            />
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: <Terminal className="h-5 w-5 text-blue-500" />,
              title: "Python Fundamentals",
              description: "Variables, data types, control flow, and functions"
            },
            {
              icon: <Code className="h-5 w-5 text-indigo-500" />,
              title: "Data Structures",
              description: "Lists, dictionaries, sets, and advanced manipulations"
            },
            {
              icon: <GraduationCap className="h-5 w-5 text-violet-500" />,
              title: "Object-oriented Programming",
              description: "Classes, inheritance, polymorphism, and encapsulation"
            },
            {
              icon: <Book className="h-5 w-5 text-pink-500" />,
              title: "File Handling & I/O",
              description: "Reading, writing, and manipulating files and directories"
            },
            {
              icon: <Brain className="h-5 w-5 text-orange-500" />,
              title: "Data Analysis",
              description: "Working with Pandas for data manipulation and analysis"
            },
            {
              icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
              title: "Web Development",
              description: "Building web applications with Flask and API integration"
            },
          ].map((item, index) => (
            <motion.div 
              key={index}
              className="p-5 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg">{item.icon}</div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold">Course Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100 text-center">
            <p className="text-blue-600 text-sm font-medium">Duration</p>
            <p className="text-2xl font-bold text-blue-800">12 weeks</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-100 text-center">
            <p className="text-purple-600 text-sm font-medium">Difficulty</p>
            <p className="text-2xl font-bold text-purple-800">Beginner to Advanced</p>
          </div>
          <div className="p-6 bg-teal-50 rounded-lg border border-teal-100 text-center">
            <p className="text-teal-600 text-sm font-medium">Practice Exercises</p>
            <p className="text-2xl font-bold text-teal-800">50+</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-2xl font-bold">AI Integration</h3>
        <div className="p-6 bg-gradient-to-r from-blue-50 to-violet-50 rounded-lg border border-blue-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto md:h-auto">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-violet-400 to-purple-500 blur-[40px] opacity-20 absolute"></div>
              <div className="relative h-full flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1677442135250-1f7da462bd72?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                     alt="AI Assistant" 
                     className="rounded-2xl shadow-lg w-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-3">Claude AI Assistant</h4>
              <p className="text-muted-foreground mb-4">
                This course is enhanced with Claude AI integration to provide personalized learning
                experiences. You'll receive:
              </p>
              <ul className="space-y-3">
                {[
                  "Real-time feedback on your code",
                  "Personalized hints when you're stuck",
                  "Dynamic practice problems tailored to your level",
                  "Ask any Python question and get immediate answers"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center gap-3 bg-white bg-opacity-60 p-3 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index + 0.6 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-6">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  Learn about our AI features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-center pt-6">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md hover:shadow-lg transition-all px-8">
          Start Learning Python Now
        </Button>
      </div>
    </div>
  );
};

export default PythonCourseIntro;
