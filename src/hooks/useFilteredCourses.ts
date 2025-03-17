
import { useMemo } from "react";
import { useCourses } from "./useCourses";
import { useCourseCategories } from "./useCourseCategories";
import { ApiCourse, FeaturedCourse, calculateLessonCount } from "@/types/course.types";

export type CourseFilters = {
  query: string;
  category: string;
  difficulty: string;
};

interface UseFilteredCoursesProps {
  filters: CourseFilters;
}

export const useFilteredCourses = ({ filters }: UseFilteredCoursesProps) => {
  const { data: courses, isLoading: isLoadingCourses } = useCourses();
  const { data: categories, isLoading: isLoadingCategories } = useCourseCategories();

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter((course) => {
      const matchesQuery =
        !filters.query ||
        course.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.query.toLowerCase());

      const matchesCategory =
        !filters.category || filters.category === "all" || course.category_id === filters.category;

      const matchesDifficulty =
        !filters.difficulty ||
        filters.difficulty === "all" ||
        course.difficulty === filters.difficulty;

      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [courses, filters]);

  const isLoading = isLoadingCourses || isLoadingCategories;

  // Calculate total lessons across all courses
  const totalLessons = useMemo(() => {
    if (!courses) return 0;
    
    return courses.reduce((total, course) => {
      return total + calculateLessonCount(course);
    }, 0);
  }, [courses]);

  // Get featured courses
  const featuredCourses = useMemo(() => {
    if (!courses) return [];
    
    // Filter courses that are marked as featured or have high popularity
    return courses
      .filter((course) => 
        (course as any).featured === true || 
        (course as any).popularity_score > 8
      )
      .slice(0, 3); // Limit to 3 featured courses
  }, [courses]);

  return {
    courses: filteredCourses,
    categories,
    isLoading,
    totalLessons,
    featuredCourses,
  };
};

// Re-export the types and helper functions
export { ApiCourse, FeaturedCourse, calculateLessonCount } from "@/types/course.types";
