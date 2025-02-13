
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CourseCategory } from "@/types/course";

export const useCourseCategories = () => {
  return useQuery({
    queryKey: ["courseCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_categories")
        .select("*")
        .order("order_index");

      if (error) {
        console.error("Error fetching course categories:", error);
        throw error;
      }

      return data as CourseCategory[];
    },
  });
};
