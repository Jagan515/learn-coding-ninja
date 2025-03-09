
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
import { Book, Code, BrainCircuit, ArrowLeft, MessageSquare } from "lucide-react";

const PythonCourse = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Python Programming
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Complete Python course from beginner to advanced
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b px-4">
                  <TabsList className="h-14 bg-transparent">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none"
                    >
                      <Book className="h-4 w-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="learning" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none"
                    >
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      Learning Path
                    </TabsTrigger>
                    <TabsTrigger 
                      value="practice" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      MCQs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="coding" 
                      className="data-[state=active]:bg-background data-[state=active]:shadow-none"
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
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Course Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Completion</span>
                      <span>25%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[25%] rounded-full"></div>
                    </div>
                  </div>
                  <Button className="w-full">Continue Learning</Button>
                </div>
              </div>
              
              <ChatInterface 
                courseContext={{
                  title: "Python Programming",
                  description: "AI-powered assistant for Python learning",
                  currentSection: activeTab
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PythonCourse;
