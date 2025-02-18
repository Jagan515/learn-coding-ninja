
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search,
  Code2,
  BookOpen,
  Star,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatInterface from "@/components/ChatInterface";

type Difficulty = "beginner" | "intermediate" | "advanced";
type Language = "python" | "javascript" | "java" | "cpp" | "c";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  language: Language;
  estimatedTime: string;
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "FizzBuzz Implementation",
    description: "Write a program that prints numbers from 1 to 100, but for multiples of 3 print 'Fizz' and for multiples of 5 print 'Buzz'.",
    difficulty: "beginner",
    language: "python",
    estimatedTime: "15 min"
  },
  {
    id: "2",
    title: "Binary Search",
    description: "Implement a binary search algorithm to find an element in a sorted array.",
    difficulty: "intermediate",
    language: "java",
    estimatedTime: "30 min"
  },
  {
    id: "3",
    title: "Linked List Reversal",
    description: "Write a function to reverse a linked list in-place.",
    difficulty: "advanced",
    language: "cpp",
    estimatedTime: "45 min"
  },
];

const difficultyColors: Record<Difficulty, string> = {
  beginner: "bg-green-500/10 text-green-500",
  intermediate: "bg-yellow-500/10 text-yellow-500",
  advanced: "bg-red-500/10 text-red-500",
};

const Practice = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChat, setShowChat] = useState(false);

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    const matchesLanguage = selectedLanguage === "all" || challenge.language === selectedLanguage;
    return matchesSearch && matchesDifficulty && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Practice Coding Challenges
              </h1>
              <p className="text-xl text-muted-foreground">
                Enhance your programming skills with our interactive challenges
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredChallenges.map((challenge) => (
                <Card key={challenge.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    <Badge className={difficultyColors[challenge.difficulty]}>
                      {challenge.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Code2 className="h-3 w-3" />
                          {challenge.language.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {challenge.estimatedTime}
                        </Badge>
                      </div>
                      <Button className="group-hover:translate-x-1 transition-transform">
                        Start Challenge
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:w-[400px]">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface 
                  courseContext={{
                    title: "Practice Assistance",
                    description: "AI-powered programming help",
                    currentSection: "Practice Challenges"
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;
