
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCourseCategories = () => {
  return useQuery({
    queryKey: ["courseCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_categories")
        .select("*")
        .order("order_index");

      if (error) throw error;
      return data;
    },
  });
};
