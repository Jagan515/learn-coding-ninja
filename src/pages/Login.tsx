
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (isSignUp: boolean) => {
    try {
      setIsLoading(true);
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Check your email",
          description: "We've sent you a verification link to complete your registration.",
        });
      } else {
        await signIn(email, password);
        navigate("/dashboard");
      }
    } catch (error: any) {
      const errorMessage = error.message;
      let userFriendlyMessage = "An error occurred.";

      // Handle specific error cases
      if (errorMessage.includes("Invalid login credentials")) {
        userFriendlyMessage = "Invalid email or password. Please try again or sign up if you don't have an account.";
      } else if (errorMessage.includes("Email not confirmed")) {
        userFriendlyMessage = "Please verify your email address before logging in.";
      } else if (errorMessage.includes("User already registered")) {
        userFriendlyMessage = "An account with this email already exists. Please try logging in instead.";
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: userFriendlyMessage,
      });
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to CodeNinja</h2>
          <p className="mt-2 text-gray-600">Sign in or create an account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="flex gap-4">
            <Button
              className="w-full"
              onClick={() => handleSubmit(false)}
              disabled={isLoading || !email || !password}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleSubmit(true)}
              disabled={isLoading || !email || !password}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
