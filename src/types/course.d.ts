
export type CourseCategory = {
  id: string;
  title: string;
  description: string | null;
  parent_id: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type CourseContent = {
  id: string;
  course_section_id: string;
  content_type: 'theory' | 'example' | 'exercise' | 'quiz' | 'project';
  content: {
    theory?: string;
    examples?: string[];
    exercises?: {
      practice: string[];
      solutions: string[];
    };
    projects?: {
      description: string;
      requirements: string[];
      guidelines: string;
    };
    quiz?: {
      questions: {
        question: string;
        options: string[];
        correctAnswer: number;
      }[];
    };
  };
  version: number;
  created_at: string;
  updated_at: string;
};

export type ContentVersion = {
  id: string;
  course_id: string;
  version: number;
  content_type: 'theory' | 'example' | 'exercise' | 'quiz' | 'project';
  content: any;
  is_current: boolean;
  created_at: string;
  created_by: string | null;
};

export type ContentProgress = {
  id: string;
  user_id: string;
  content_id: string;
  score: number | null;
  completed_at: string;
  attempts: number;
};
