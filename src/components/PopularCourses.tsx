
import { useCourses } from "@/hooks/useCourses";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const PopularCourses = () => {
  const navigate = useNavigate();
  const { data: courses, isLoading, error } = useCourses();

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[300px] animate-pulse bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-red-500">Failed to load courses</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl font-bold tracking-tight">
            Popular Courses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your coding journey with our most popular courses
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideIn">
          {courses?.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              level={course.difficulty}
              duration={`${course.estimated_hours}h`}
              progress={0}
              lessons={24}
              language={course.programming_language}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
