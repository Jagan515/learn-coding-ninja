
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CodeTerminal from "@/components/CodeEditor/CodeTerminal";

const Terminal = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Terminal</h1>
        <CodeTerminal />
      </main>
    </div>
  );
};

export default Terminal;
