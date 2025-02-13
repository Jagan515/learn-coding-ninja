
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import CourseProgress from "@/components/CourseProgress";
import { Book } from "lucide-react";

const CourseDetails = () => {
  const { courseId } = useParams();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
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
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
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
