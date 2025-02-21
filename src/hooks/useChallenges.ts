
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  programming_language: "python" | "javascript" | "java" | "cpp" | "c";
  estimated_time: string;
  initial_code: string | null;
  test_cases: any[] | null;
}

export const useChallenges = () => {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select("*");

      if (error) {
        throw error;
      }

      return data as Challenge[];
    },
  });
};
