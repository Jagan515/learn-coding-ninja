
// Define common course types for use throughout the application

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type ChallengeDifficulty = "easy" | "medium" | "hard";

export interface ApiCourse {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category_id?: string;
  difficulty: Difficulty;
  estimated_hours: number;
  instructor?: string;
  popularity_score?: number;
  created_at?: string;
  content_version?: number;
  course_sections?: CourseSection[];
  updated_at?: string;
  featured?: boolean;
  programming_language?: string;
}

export interface FeaturedCourse extends ApiCourse {
  featured: true;
}

export interface CourseSection {
  id: string;
  title: string;
  order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: string;
  order: number;
  completed?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Helper function to calculate lesson count for a course
export const calculateLessonCount = (course: ApiCourse): number => {
  if (!course.course_sections) return 0;
  
  let count = 0;
  course.course_sections.forEach((section: CourseSection) => {
    if (section.lessons && Array.isArray(section.lessons)) {
      count += section.lessons.length;
    }
  });
  
  return count;
};

// Challenge types
export interface TestCase {
  id: string;
  input: string;
  output: string;
  explanation: string;
  passed?: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: ChallengeDifficulty;
  description: string;
  starterCode: string;
  hints: string[];
  testCases: TestCase[];
}
