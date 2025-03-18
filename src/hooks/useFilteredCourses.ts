
import { useMemo, useState } from "react";
import { useCourses, getFeaturedCourses } from "./useCourses";
import { useCourseCategories } from "./useCourseCategories";
import type { ApiCourse, FeaturedCourse } from "@/types/course.types";
import { calculateLessonCount } from "@/types/course.types";

export type CourseFilters = {
  query: string;
  category: string;
  difficulty: string;
};

export const useFilteredCourses = () => {
  const { data: apiCourses, isLoading: isLoadingCourses } = useCourses();
  const { data: categories, isLoading: isLoadingCategories } = useCourseCategories();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Define featured courses separately with the proper type
  const featuredCoursesData = useMemo(() => getFeaturedCourses(), []);

  // Combine API courses with featured courses
  const allCourses = useMemo(() => {
    if (!apiCourses) return featuredCoursesData as ApiCourse[];
    return [...apiCourses, ...featuredCoursesData] as ApiCourse[];
  }, [apiCourses, featuredCoursesData]);

  // Filter courses based on search, category, and difficulty
  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch = !search || 
        course.title.toLowerCase().includes(search.toLowerCase()) || 
        course.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        selectedCategory === "all" || 
        // Safely check for category_id
        (course.category_id && course.category_id === selectedCategory);
      
      const matchesDifficulty = !selectedDifficulty || 
        selectedDifficulty === "all" || 
        course.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [allCourses, search, selectedCategory, selectedDifficulty]);

  // Calculate total lessons across all courses
  const totalLessons = useMemo(() => {
    return allCourses.reduce((total, course) => {
      return total + calculateLessonCount(course);
    }, 0);
  }, [allCourses]);

  // Get featured courses
  const featuredCourses = useMemo(() => {
    return (allCourses.filter(course => 
      (course as any).featured === true || 
      (course.popularity_score !== undefined && course.popularity_score > 8)
    ).slice(0, 3)) as FeaturedCourse[];
  }, [allCourses]);

  return {
    courses: filteredCourses,
    categories,
    isLoading: isLoadingCourses || isLoadingCategories,
    totalLessons,
    featuredCourses,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    selectedDifficulty,
    setSelectedDifficulty,
    apiCourses: allCourses,
    isLoadingCourses
  };
};

// Export types for use in other components
export type { ApiCourse, FeaturedCourse };
export { calculateLessonCount };
