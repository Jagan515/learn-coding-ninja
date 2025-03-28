
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CodeTerminal from "@/components/CodeEditor/CodeTerminal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, FileCode, Server, Terminal as TerminalIcon, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Terminal = () => {
  const { user } = useAuth();

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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Code Terminal</h1>
            <p className="text-muted-foreground">
              Write, compile, and execute code in Python, Java, C, and C++. Our secure environment 
              provides real-time feedback and syntax highlighting.
            </p>
          </div>
          
          <Card className="bg-card border-2">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TerminalIcon className="h-5 w-5 text-primary" />
                    Code Compiler
                  </CardTitle>
                  <CardDescription>Select a language and start coding</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                    Environment Active
                  </span>
                </div>
              </div>
            </CardHeader>

            <Separator className="mb-4" />
            
            <CardContent>
              <Tabs defaultValue="terminal" className="w-full">
                <TabsList className="w-full justify-start mb-4 bg-muted/50">
                  <TabsTrigger value="terminal" className="flex items-center gap-1">
                    <TerminalIcon className="h-4 w-4" />
                    Terminal
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="flex items-center gap-1">
                    <FileCode className="h-4 w-4" />
                    Docs
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="terminal" className="space-y-4">
                  <CodeTerminal />
                </TabsContent>
                
                <TabsContent value="features">
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {[
                      {
                        title: "Multi-language Support",
                        description: "Write code in Python, Java, C, and C++ with full language support",
                        icon: FileCode,
                        color: "text-blue-500",
                        bgColor: "bg-blue-500/10"
                      },
                      {
                        title: "Real-time Compilation",
                        description: "Get instant feedback as you write and execute your code",
                        icon: Zap,
                        color: "text-yellow-500",
                        bgColor: "bg-yellow-500/10"
                      },
                      {
                        title: "Secure Runtime Environment",
                        description: "Execute code in an isolated and secure sandbox environment",
                        icon: Server,
                        color: "text-green-500",
                        bgColor: "bg-green-500/10"
                      },
                      {
                        title: "Performance Insights",
                        description: "Analyze your code execution time and memory usage",
                        icon: Cpu,
                        color: "text-purple-500",
                        bgColor: "bg-purple-500/10"
                      }
                    ].map((feature, index) => (
                      <motion.div key={index} variants={item}>
                        <Card className="h-full border-muted">
                          <CardHeader className="pb-2">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                                <CardDescription>{feature.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="docs">
                  <div className="p-4 bg-muted/30 rounded-lg space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Language Support</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { name: "Python", version: "3.10", badge: "Most Popular" },
                          { name: "Java", version: "17", badge: null },
                          { name: "C++", version: "17", badge: null },
                          { name: "C", version: "C11", badge: null }
                        ].map((lang, index) => (
                          <div key={index} className="p-3 border rounded-lg bg-card">
                            <div className="font-medium">{lang.name}</div>
                            <div className="text-sm text-muted-foreground">v{lang.version}</div>
                            {lang.badge && (
                              <Badge className="mt-2 bg-primary/20 text-primary hover:bg-primary/30">
                                {lang.badge}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Using The Terminal</h3>
                      <ol className="list-decimal ml-5 space-y-2 text-muted-foreground">
                        <li>Select your programming language from the dropdown</li>
                        <li>Write your code in the editor with syntax highlighting</li>
                        <li>Press the Run button to execute your code</li>
                        <li>View the output in the terminal display below</li>
                        <li>Check for any errors or debugging information</li>
                      </ol>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Terminal;
