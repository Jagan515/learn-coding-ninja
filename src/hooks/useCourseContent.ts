
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { CourseContent } from "@/types/course";

export const useCourseContent = (sectionId: string | undefined) => {
  return useQuery({
    queryKey: ["courseContent", sectionId],
    queryFn: async () => {
      if (!sectionId) return null;

      const { data, error } = await supabase
        .from("course_contents")
        .select("*")
        .eq("course_section_id", sectionId)
        .order("content_type");

      if (error) {
        console.error("Error fetching course content:", error);
        throw error;
      }

      return data as CourseContent[];
    },
    enabled: !!sectionId,
  });
};
