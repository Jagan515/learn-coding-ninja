
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/ChatInterface";
import PythonCourseIntro from "@/components/course/python/PythonCourseIntro";
import LearningPath from "@/components/course/python/LearningPath";
import PythonMCQ from "@/components/course/python/PythonMCQ";
import CodingChallenge from "@/components/course/python/CodingChallenge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Book, 
  Code, 
  BrainCircuit, 
  ArrowLeft, 
  MessageSquare, 
  Bookmark,
  GraduationCap,
  CheckCircle
} from "lucide-react";

const PythonCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-2 hover:bg-slate-100"
            onClick={() => navigate("/courses")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Course Content */}
          <motion.div className="lg:col-span-2 space-y-6" variants={item}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Python Programming
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Complete Python course from beginner to advanced
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" className="flex items-center gap-1.5 bg-primary">
                  <GraduationCap className="h-4 w-4" />
                  Enroll
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg border shadow-md overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b px-4">
                  <TabsList className="h-16 bg-transparent">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
                    >
                      <Book className="h-4 w-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="learning" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
                    >
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      Learning Path
                    </TabsTrigger>
                    <TabsTrigger 
                      value="practice" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      MCQs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="coding" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Coding
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="overview" className="p-6">
                  <PythonCourseIntro />
                </TabsContent>
                <TabsContent value="learning" className="p-6">
                  <LearningPath />
                </TabsContent>
                <TabsContent value="practice" className="p-6">
                  <PythonMCQ />
                </TabsContent>
                <TabsContent value="coding" className="p-6">
                  <CodingChallenge />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>

          {/* AI Assistant Sidebar */}
          <motion.div className="lg:col-span-1" variants={item}>
            <div className="sticky top-8 space-y-6">
              <motion.div 
                className="bg-card rounded-lg border shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-4">Course Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Completion</span>
                      <span>25%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 w-[25%] rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-blue-800 font-medium">3/12</p>
                      <p className="text-blue-600">Lessons</p>
                    </div>
                    <div className="p-3 bg-violet-50 rounded-lg border border-violet-100">
                      <p className="text-violet-800 font-medium">5/20</p>
                      <p className="text-violet-600">Exercises</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Python Basics</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Variables and Data Types</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-4 w-4 rounded-full border-2 border-muted"></div>
                      <span>Control Flow</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600">Continue Learning</Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ChatInterface 
                  courseContext={{
                    title: "Python Programming",
                    description: "AI-powered assistant for Python learning",
                    currentSection: activeTab
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PythonCourse;
