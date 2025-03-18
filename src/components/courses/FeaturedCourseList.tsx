
import { FeaturedCourse, calculateLessonCount } from "@/types/course.types";
import CourseCard from "@/components/CourseCard";

interface FeaturedCourseListProps {
  courses: FeaturedCourse[];
  onCourseClick: (courseId: string) => void;
}

const FeaturedCourseList = ({ courses, onCourseClick }: FeaturedCourseListProps) => {
  if (courses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Featured Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => {
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
              featured={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCourseList;
