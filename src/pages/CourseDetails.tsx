
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import CourseProgress from "@/components/CourseProgress";
import ChatInterface from "@/components/ChatInterface";
import { Book } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId || !UUID_REGEX.test(courseId)) {
        navigate("/404");
        return null;
      }

      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          course_sections (
            id,
            title,
            description,
            order_index,
            lessons (
              id,
              title,
              content_type,
              duration_minutes
            )
          )
        `)
        .eq("id", courseId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching course:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load course details. Please try again.",
        });
        throw error;
      }

      if (!data) {
        navigate("/404");
        return null;
      }

      return data;
    },
    enabled: !!courseId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return null; // Navigation to 404 will handle this case
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground">{course.description}</p>
            </div>

            {/* Course Sections */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Course Content</h2>
              {course.course_sections
                ?.sort((a, b) => a.order_index - b.order_index)
                .map((section) => (
                  <div key={section.id} className="border rounded-lg p-4">
                    <h3 className="text-xl font-medium mb-2">{section.title}</h3>
                    <p className="text-muted-foreground mb-4">{section.description}</p>
                    <ul className="space-y-2">
                      {section.lessons?.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                          <div className="flex items-center gap-2">
                            <Book className="h-4 w-4" />
                            <span>{lesson.title}</span>
                          </div>
                          {lesson.duration_minutes && (
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration_minutes} min
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>

            {/* Chat Interface */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Course Assistant</h2>
              <ChatInterface 
                courseContext={{
                  title: course.title,
                  description: course.description,
                  currentSection: course.course_sections?.[0]?.title
                }}
              />
            </div>
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 border rounded-lg p-6 space-y-6">
              <CourseProgress
                completedLessons={0}
                totalLessons={course.course_sections?.reduce(
                  (acc, section) => acc + (section.lessons?.length || 0),
                  0
                ) || 0}
                estimatedHours={course.estimated_hours}
              />
              <Button className="w-full" size="lg">
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
