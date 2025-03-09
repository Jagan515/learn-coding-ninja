
import { Star } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { FeaturedCourse, calculateLessonCount } from "@/hooks/useFilteredCourses";

interface FeaturedCourseListProps {
  courses: FeaturedCourse[];
  onCourseClick: (courseId: string) => void;
}

const FeaturedCourseList = ({ courses, onCourseClick }: FeaturedCourseListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Featured Courses</h3>
      <div className="grid grid-cols-1 gap-6">
        {courses.map(course => (
          <div key={course.id} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-primary text-white px-4 py-1 rounded-bl-lg z-10 flex items-center gap-1">
              <Star className="h-4 w-4 fill-white" />
              <span className="font-medium">Featured</span>
            </div>
            <CourseCard
              id={course.id}
              title={course.title}
              description={course.description}
              level={course.difficulty}
              duration={`${course.estimated_hours}h`}
              progress={0}
              lessons={calculateLessonCount(course)}
              language={course.programming_language}
              onClick={() => onCourseClick(course.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourseList;
