
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CodeTerminal from "@/components/CodeEditor/CodeTerminal";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Terminal = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Code Terminal</h1>
            <p className="text-muted-foreground">
              Write, compile, and execute code in Python, Java, C, and C++. Our secure environment 
              provides real-time feedback and syntax highlighting.
            </p>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border-2">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Code Compiler</h2>
                    <p className="text-sm text-muted-foreground">Select a language and start coding</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Environment Active
                  </div>
                </div>
                
                <Separator />
                
                <CodeTerminal />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Terminal;
