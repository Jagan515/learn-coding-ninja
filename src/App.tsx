
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Terminal from "./pages/Terminal";
import NotFound from "./pages/NotFound";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import Practice from "./pages/Practice";
import Discussion from "./pages/Discussion";
import ThreadDetail from "./pages/ThreadDetail";
import NewThread from "./pages/NewThread";
import PythonCourse from "./pages/PythonCourse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/courses/python" element={<PythonCourse />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/terminal"
                element={
                  <ProtectedRoute>
                    <Terminal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/practice"
                element={
                  <ProtectedRoute>
                    <Practice />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion"
                element={
                  <ProtectedRoute>
                    <Discussion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion/:threadId"
                element={
                  <ProtectedRoute>
                    <ThreadDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/discussion/new"
                element={
                  <ProtectedRoute>
                    <NewThread />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
