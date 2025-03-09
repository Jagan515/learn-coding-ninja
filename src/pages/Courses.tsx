import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { useCourseCategories } from "@/hooks/useCourseCategories";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/CourseCard";
import GoalsSetting from "@/components/GoalsSetting";
import ChatInterface from "@/components/ChatInterface";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen, Filter, Star } from "lucide-react";

// Define a custom type for the Python course that matches the API course shape
interface PythonCourse {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  course_sections: any[];
  programming_language: string;
  featured: boolean;
  category_id?: string;
}

// Define a type for API courses
interface ApiCourse {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  course_sections: {
    id: string;
    title: string;
    lessons?: { id: string }[];
  }[];
  programming_language: string;
  featured?: boolean;
  category?: { id: string };
  category_id?: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  const { data: categories = [], isLoading: isLoadingCategories } = useCourseCategories();

  // Python course special card (featured course)
  const pythonCourse: PythonCourse = {
    id: "python-course",
    title: "Python Programming",
    description: "Learn Python from scratch with AI-powered assistance and hands-on practice",
    difficulty: "beginner",
    estimated_hours: 40,
    course_sections: Array(6).fill({}),
    programming_language: "Python",
    featured: true
  };

  const handleCourseClick = (courseId: string) => {
    if (courseId === "python-course") {
      navigate("/courses/python");
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  const allCourses = [pythonCourse, ...courses];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                         course.description.toLowerCase().includes(search.toLowerCase());
    
    // Handle both course types (API course with category field and PythonCourse)
    const matchesCategory = selectedCategory === "all" || 
                           (course as ApiCourse).category?.id === selectedCategory ||
                           course.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Function to safely calculate the lesson count for a course
  const calculateLessonCount = (course: PythonCourse | ApiCourse): number => {
    // If it doesn't have course_sections, return 0
    if (!course.course_sections) return 0;
    
    // Calculate the sum
    return course.course_sections.reduce((total, section) => {
      // If the section has lessons property and it's an array, add its length
      if (section.lessons && Array.isArray(section.lessons)) {
        return total + section.lessons.length;
      }
      // Otherwise, don't add anything
      return total;
    }, 0);
  };

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
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Explore Our Programming Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from expertly crafted courses and advance your programming skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Goals Section */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Learning Goals</h2>
                <GoalsSetting />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Search and Filter Section */}
            <div className="bg-card rounded-lg p-6 shadow-sm">
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

            {/* Featured Course - Python */}
            <div className="relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-primary text-white px-4 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                <Star className="h-4 w-4 fill-white" />
                <span className="font-medium">Featured</span>
              </div>
              <CourseCard
                key={pythonCourse.id}
                id={pythonCourse.id}
                title={pythonCourse.title}
                description={pythonCourse.description}
                level={pythonCourse.difficulty}
                duration={`${pythonCourse.estimated_hours}h`}
                progress={25}
                lessons={24}
                language={pythonCourse.programming_language}
                onClick={() => handleCourseClick(pythonCourse.id)}
              />
            </div>

            {/* Course Grid */}
            <h3 className="text-xl font-semibold">All Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredCourses.length > 1 ? (
                filteredCourses.filter(course => course.id !== "python-course").map((course) => {
                  // Calculate lessons using the safe function
                  const lessonCount = calculateLessonCount(course);
                  
                  return (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      level={course.difficulty}
                      duration={`${course.estimated_hours}h`}
                      progress={0}
                      lessons={lessonCount}
                      language={course.programming_language}
                      onClick={() => handleCourseClick(course.id)}
                    />
                  );
                })
              ) : (
                search || selectedCategory !== "all" ? (
                  <div className="col-span-2 text-center py-12 space-y-4 bg-card rounded-lg shadow-sm">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold">No courses found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Chat Interface Section */}
          <div className="lg:col-span-3">
            <div className="sticky top-8">
              <ChatInterface 
                courseContext={{
                  title: "Course Assistance",
                  description: "Get help with finding the right course for you"
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Courses;
