
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ThreadList from "@/components/discussion/ThreadList";
import { SearchInput } from "@/components/discussion/SearchInput";
import CategoryFilter from "@/components/discussion/CategoryFilter";
import DiscussionHeader from "@/components/discussion/DiscussionHeader";
import { ThreadCategory } from "@/types/discussion";
import { useAuth } from "@/contexts/AuthContext";

// Mock data - would be replaced with API calls
const mockCategories: ThreadCategory[] = [
  { id: "1", name: "General", description: "General discussions", color: "#4F46E5" },
  { id: "2", name: "JavaScript", description: "JavaScript discussions", color: "#F59E0B" },
  { id: "3", name: "Python", description: "Python discussions", color: "#10B981" },
  { id: "4", name: "React", description: "React discussions", color: "#06B6D4" },
  { id: "5", name: "Algorithms", description: "Algorithm discussions", color: "#8B5CF6" },
];

const Discussion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories((prev) => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Create new thread
  const handleCreateThread = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // We would navigate to thread creation page or open a modal
    console.log("Create new thread");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <DiscussionHeader 
          onCreateThread={handleCreateThread}
          isAuthenticated={!!user}
        />
        
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Left sidebar - Filters */}
          <div className="md:w-1/4">
            <div className="sticky top-20">
              <SearchInput 
                value={searchQuery} 
                onChange={handleSearch}
                placeholder="Search discussions..." 
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <CategoryFilter 
                  categories={mockCategories} 
                  selectedCategories={selectedCategories}
                  onSelectCategory={handleCategorySelect}
                />
              </div>
            </div>
          </div>
          
          {/* Main content - Thread list */}
          <div className="md:w-3/4">
            <ThreadList 
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discussion;
