import { useState } from "react";
import { useCourses, getFeaturedCourses } from "@/hooks/useCourses";

// Define types for courses
export interface FeaturedCourse {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  course_sections: { lessons?: { id: string }[] }[];
  programming_language: string;
  featured: boolean;
  category_id?: string;
}

// Define a type for API courses
export interface ApiCourse {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  course_sections: {
    id: string;
    title: string;
    lessons?: { id: string }[];
  }[];
  programming_language: string;
  featured?: boolean;
  category?: { id: string };
  category_id?: string;
}

export type CourseType = FeaturedCourse | ApiCourse;

export const useFilteredCourses = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  
  // Get all featured courses
  const featuredCourses: FeaturedCourse[] = getFeaturedCourses();

  // Combine API and featured courses
  const allCourses = [...featuredCourses, ...courses];

  // Filter courses based on search term and selected category
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase());
    
    // Handle both course types (API course with category field and FeaturedCourse)
    const matchesCategory = selectedCategory === "all" || 
                           (course as ApiCourse).category?.id === selectedCategory ||
                           course.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    filteredCourses,
    featuredCourses,
    apiCourses: courses,
    isLoadingCourses
  };
};

// Function to safely calculate the lesson count for a course
export const calculateLessonCount = (course: CourseType): number => {
  // If it doesn't have course_sections, return 0
  if (!course.course_sections) return 0;
  
  // Calculate the sum
  return course.course_sections.reduce((total, section) => {
    // If the section has lessons property and it's an array, add its length
    if (section.lessons && Array.isArray(section.lessons)) {
      return total + section.lessons.length;
    }
    // Otherwise, don't add anything
    return total;
  }, 0);
};
