
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CodeTerminal from "@/components/CodeEditor/CodeTerminal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, Code, Terminal as TerminalIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.email?.split('@')[0] || 'Coder'}</h1>
          <p className="text-muted-foreground mt-1">Continue your coding journey where you left off</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="playground">Coding Playground</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={item}>
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-400/10 pb-8">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Practice Coding
                    </CardTitle>
                    <CardDescription>
                      Improve your skills with hands-on challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-primary/5">45 Challenges</Badge>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/practice')}>
                        Start Coding <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-400/10 to-cyan-400/10 pb-8">
                    <CardTitle className="flex items-center gap-2">
                      <TerminalIcon className="h-5 w-5 text-blue-500" />
                      Command Terminal
                    </CardTitle>
                    <CardDescription>
                      Execute code in our secure environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-blue-500/5">4 Languages</Badge>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/terminal')}>
                        Open Terminal <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <CardHeader className="bg-gradient-to-r from-green-400/10 to-emerald-400/10 pb-8">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-green-500" />
                      Learning Paths
                    </CardTitle>
                    <CardDescription>
                      Structured courses for your learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="bg-green-500/5">5 Paths</Badge>
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/courses')}>
                        Explore Courses <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Completed Python Basics Quiz", time: "2 days ago", icon: Award, color: "text-green-500" },
                      { title: "Started Data Structures Course", time: "5 days ago", icon: BookOpen, color: "text-blue-500" },
                      { title: "Solved Algorithmic Challenge", time: "1 week ago", icon: Code, color: "text-purple-500" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`p-2 rounded-full bg-${activity.color.split('-')[1]}-500/10`}>
                          <activity.icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="playground">
            <Card>
              <CardHeader>
                <CardTitle>Coding Playground</CardTitle>
                <CardDescription>
                  Write, compile, and execute code directly in your browser
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeTerminal />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>
                  Track your journey through our coding courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { course: "Python Fundamentals", progress: 75, color: "bg-blue-500" },
                    { course: "JavaScript Basics", progress: 45, color: "bg-yellow-500" },
                    { course: "Data Structures", progress: 30, color: "bg-green-500" },
                    { course: "Algorithms", progress: 10, color: "bg-purple-500" },
                  ].map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{course.course}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${course.color} transition-all duration-500 ease-out`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
