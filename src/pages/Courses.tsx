
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { useCourseCategories } from "@/hooks/useCourseCategories";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/CourseCard";
import GoalsSetting from "@/components/GoalsSetting";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen, Filter } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  const { data: categories = [], isLoading: isLoadingCategories } = useCourseCategories();

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category?.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoadingCourses || isLoadingCategories) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[300px] animate-pulse bg-muted rounded-lg" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-4 mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Explore Our Programming Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from expertly crafted courses and advance your programming skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Goals Section */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow-sm sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Learning Goals</h2>
              <GoalsSetting />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Enhanced Search and Filter Section */}
            <div className="bg-card rounded-lg p-6 shadow-sm animate-slideIn">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Enhanced Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideIn">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  level={course.difficulty}
                  duration={`${course.estimated_hours}h`}
                  progress={0}
                  lessons={course.course_sections?.reduce(
                    (acc, section) => acc + (section.lessons?.length || 0),
                    0
                  ) || 0}
                  language={course.programming_language}
                  onClick={() => handleCourseClick(course.id)}
                />
              ))}
            </div>

            {/* Enhanced Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12 space-y-4 bg-card rounded-lg shadow-sm animate-fadeIn">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
