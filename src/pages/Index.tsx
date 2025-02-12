
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PopularCourses from "@/components/PopularCourses";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PopularCourses />
      </main>
    </div>
  );
};

export default Index;
