
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import GoalsSetting from "@/components/GoalsSetting";
import ChatInterface from "@/components/ChatInterface";
import PageHeader from "@/components/courses/PageHeader";
import SearchFilterBar from "@/components/courses/SearchFilterBar";
import FeaturedCourseList from "@/components/courses/FeaturedCourseList";
import CourseList from "@/components/courses/CourseList";
import { useFilteredCourses } from "@/hooks/useFilteredCourses";

const Courses = () => {
  const navigate = useNavigate();
  const { 
    courses,
    featuredCourses,
    search, 
    setSearch, 
    selectedCategory, 
    setSelectedCategory,
    isLoading 
  } = useFilteredCourses();

  const handleCourseClick = (courseId: string) => {
    // Map course IDs to their respective routes
    const courseRoutes: Record<string, string> = {
      "python-course": "/courses/python",
      "cpp-course": "/courses/cpp",
      "c-course": "/courses/c",
      "java-course": "/courses/java",
      "dsa-course": "/courses/dsa"
    };

    if (courseRoutes[courseId]) {
      navigate(courseRoutes[courseId]);
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  if (isLoading) {
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
        <PageHeader />

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
            <SearchFilterBar
              search={search}
              onSearchChange={setSearch}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Featured Courses Section */}
            <FeaturedCourseList 
              courses={featuredCourses} 
              onCourseClick={handleCourseClick} 
            />

            {/* Regular Courses */}
            <CourseList 
              courses={courses.filter(course => !('featured' in course && course.featured))} 
              onCourseClick={handleCourseClick} 
              isFiltering={search !== "" || selectedCategory !== "all"}
            />
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
