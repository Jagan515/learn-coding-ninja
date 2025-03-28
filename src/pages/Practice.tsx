
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Brain, Code, Filter, BarChart, CheckCircle, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

// Mock data
const challenges = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Easy",
    category: "String Manipulation",
    completed: true,
    language: "Python",
    path: "python",
  },
  {
    id: 2,
    title: "Find Maximum Value",
    difficulty: "Easy",
    category: "Arrays",
    completed: true,
    language: "Python",
    path: "python",
  },
  {
    id: 3,
    title: "Implement Binary Search",
    difficulty: "Medium",
    category: "Algorithms",
    completed: false,
    language: "Python",
    path: "python",
  },
  {
    id: 4,
    title: "Linked List Operations",
    difficulty: "Medium",
    category: "Data Structures",
    completed: false,
    language: "C++",
    path: "cpp",
  },
  {
    id: 5,
    title: "Graph Traversal",
    difficulty: "Hard",
    category: "Algorithms",
    completed: false,
    language: "Java",
    path: "java",
  },
  {
    id: 6,
    title: "Memory Management",
    difficulty: "Hard",
    category: "System",
    completed: false,
    language: "C",
    path: "c",
  },
];

const Practice = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  
  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulty.includes(difficulty)) {
      setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty));
    } else {
      setSelectedDifficulty([...selectedDifficulty, difficulty]);
    }
  };
  
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty.length === 0 || 
                             selectedDifficulty.includes(challenge.difficulty);
    return matchesSearch && matchesDifficulty;
  });
  
  const completedCount = challenges.filter(c => c.completed).length;
  const completionPercentage = Math.round((completedCount / challenges.length) * 100);

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
            <h1 className="text-3xl font-bold text-foreground">Coding Practice</h1>
            <p className="text-muted-foreground">
              Sharpen your skills with our collection of coding challenges across different languages and difficulty levels.
            </p>
          </div>
          
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Your Progress</h3>
                  <p className="text-muted-foreground">You've completed {completedCount} of {challenges.length} challenges</p>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{completedCount} completed</span>
                    <span className="text-sm font-medium">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search challenges..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Difficulty</label>
                    <div className="flex flex-wrap gap-2">
                      {["Easy", "Medium", "Hard"].map((difficulty) => (
                        <Badge
                          key={difficulty}
                          variant={selectedDifficulty.includes(difficulty) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleDifficulty(difficulty)}
                        >
                          {difficulty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Easy", completed: 2, total: 2, color: "bg-green-500" },
                      { label: "Medium", completed: 0, total: 2, color: "bg-yellow-500" },
                      { label: "Hard", completed: 0, total: 2, color: "bg-red-500" },
                    ].map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{stat.label}</span>
                          <span>{stat.completed}/{stat.total}</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${stat.color}`} 
                            style={{ width: `${(stat.completed / stat.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="all" className="flex items-center gap-1">
                    <Code className="h-4 w-4" />
                    All Challenges
                  </TabsTrigger>
                  <TabsTrigger value="recommended" className="flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    Recommended
                  </TabsTrigger>
                  <TabsTrigger value="learning" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Learning Paths
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 gap-4"
                  >
                    {filteredChallenges.length > 0 ? (
                      filteredChallenges.map((challenge) => (
                        <motion.div key={challenge.id} variants={item}>
                          <Card className="hover:border-primary/50 transition-all">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <CardTitle className="flex items-center gap-2">
                                    {challenge.title}
                                    {challenge.completed && (
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    )}
                                  </CardTitle>
                                  <CardDescription>{challenge.category}</CardDescription>
                                </div>
                                <Badge
                                  className={`
                                    ${challenge.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 
                                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 
                                      'bg-red-500/10 text-red-500'}
                                  `}
                                >
                                  {challenge.difficulty}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardFooter className="flex justify-between pt-2">
                              <Badge variant="outline">{challenge.language}</Badge>
                              <Button size="sm" className="gap-1">
                                Solve <ArrowRight className="h-3 w-3" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No challenges match your filters.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => {setSearchTerm(''); setSelectedDifficulty([]);}}
                          className="mt-4"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="recommended">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Based on your previous solutions, we recommend these challenges to help you grow:
                    </p>
                    <motion.div 
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 gap-4"
                    >
                      {challenges.filter(c => !c.completed).slice(0, 3).map((challenge) => (
                        <motion.div key={challenge.id} variants={item}>
                          <Card className="hover:border-primary/50 transition-all">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <CardTitle>{challenge.title}</CardTitle>
                                  <CardDescription>{challenge.category}</CardDescription>
                                </div>
                                <Badge
                                  className={`
                                    ${challenge.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' : 
                                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' : 
                                      'bg-red-500/10 text-red-500'}
                                  `}
                                >
                                  {challenge.difficulty}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardFooter className="flex justify-between pt-2">
                              <Badge variant="outline">{challenge.language}</Badge>
                              <Button size="sm" className="gap-1">
                                Solve <ArrowRight className="h-3 w-3" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </TabsContent>
                
                <TabsContent value="learning">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Follow these learning paths to master specific programming concepts:
                    </p>
                    <motion.div 
                      variants={container}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {[
                        {
                          title: "Algorithm Mastery",
                          description: "Learn sorting, searching and graph algorithms",
                          challenges: 12,
                          progress: 25,
                          color: "bg-blue-500"
                        },
                        {
                          title: "Data Structures",
                          description: "Master arrays, linked lists, trees and graphs",
                          challenges: 15,
                          progress: 10,
                          color: "bg-purple-500"
                        },
                        {
                          title: "Functional Programming",
                          description: "Learn to code in a functional paradigm",
                          challenges: 8,
                          progress: 0,
                          color: "bg-green-500"
                        },
                        {
                          title: "Dynamic Programming",
                          description: "Tackle complex problems with DP techniques",
                          challenges: 10,
                          progress: 0,
                          color: "bg-yellow-500"
                        }
                      ].map((path, index) => (
                        <motion.div key={index} variants={item}>
                          <Card className="hover:border-primary/50 transition-all h-full">
                            <CardHeader>
                              <CardTitle>{path.title}</CardTitle>
                              <CardDescription>{path.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>{path.progress}% complete</span>
                                  <span>{path.challenges} challenges</span>
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${path.color}`} 
                                    style={{ width: `${path.progress}%` }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" className="w-full">View Path</Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Practice;
