
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          enrollments (
            completed_at,
            enrolled_at
          ),
          category:course_categories (
            id,
            title,
            description,
            parent_id
          ),
          course_sections (
            id,
            title,
            lessons (
              id
            )
          )
        `)
        .eq("is_published", true);

      if (error) throw error;
      return data;
    },
  });
};

// Add featured courses for various tech stacks
export const getFeaturedCourses = () => {
  const featuredCourses = [
    {
      id: "python-course",
      title: "Python Programming",
      description: "Learn Python from scratch with AI-powered assistance and hands-on practice",
      difficulty: "beginner" as const,
      estimated_hours: 40,
      course_sections: Array(6).fill({ lessons: Array(4).fill({ id: "lesson-id" }) }),
      programming_language: "Python",
      featured: true
    },
    {
      id: "cpp-course",
      title: "C++ Programming",
      description: "Master C++ fundamentals, STL, and advanced concepts with practical exercises",
      difficulty: "intermediate" as const,
      estimated_hours: 50,
      course_sections: Array(7).fill({ lessons: Array(4).fill({ id: "lesson-id" }) }),
      programming_language: "C++",
      featured: true
    },
    {
      id: "c-course",
      title: "C Programming",
      description: "Build a strong foundation in C programming with memory management and data structures",
      difficulty: "beginner" as const,
      estimated_hours: 35,
      course_sections: Array(5).fill({ lessons: Array(4).fill({ id: "lesson-id" }) }),
      programming_language: "C",
      featured: true
    },
    {
      id: "java-course",
      title: "Java Programming",
      description: "Comprehensive Java course covering OOP, collections, threading, and enterprise applications",
      difficulty: "intermediate" as const,
      estimated_hours: 60,
      course_sections: Array(8).fill({ lessons: Array(4).fill({ id: "lesson-id" }) }),
      programming_language: "Java",
      featured: true
    },
    {
      id: "dsa-course",
      title: "Data Structures & Algorithms",
      description: "Essential DSA concepts with implementation in multiple languages and problem-solving techniques",
      difficulty: "advanced" as const,
      estimated_hours: 70,
      course_sections: Array(10).fill({ lessons: Array(4).fill({ id: "lesson-id" }) }),
      programming_language: "Multiple",
      featured: true
    }
  ];
  
  return featuredCourses;
};
