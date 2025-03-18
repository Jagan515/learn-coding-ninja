
import { BookOpen } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { ApiCourse, calculateLessonCount } from "@/types/course.types";

interface CourseListProps {
  courses: ApiCourse[];
  onCourseClick: (courseId: string) => void;
  isFiltering: boolean;
}

const CourseList = ({ courses, onCourseClick, isFiltering }: CourseListProps) => {
  if (courses.length === 0 && isFiltering) {
    return (
      <div className="col-span-2 text-center py-12 space-y-4 bg-card rounded-lg shadow-sm">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
        <h3 className="text-xl font-semibold">No courses found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">All Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => {
          // Calculate lessons using the safe function
          const lessonCount = calculateLessonCount(course);
          
          return (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              level={course.difficulty}
              duration={`${course.estimated_hours}h`}
              progress={0}
              lessons={lessonCount}
              language={course.programming_language}
              onClick={() => onCourseClick(course.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseList;
