
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
          )
        `)
        .eq("is_published", true);

      if (error) throw error;
      return data;
    },
  });
};
