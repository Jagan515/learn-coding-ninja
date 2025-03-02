
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThreadCategory } from "@/types/discussion";

interface CategoryFilterProps {
  categories: ThreadCategory[];
  selectedCategories: string[];
  onSelectCategory: (categoryId: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onSelectCategory 
}: CategoryFilterProps) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors",
            selectedCategories.includes(category.id)
              ? "bg-accent"
              : "hover:bg-muted"
          )}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span>{category.name}</span>
          </div>
          
          {selectedCategories.includes(category.id) && (
            <CheckIcon className="h-4 w-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
