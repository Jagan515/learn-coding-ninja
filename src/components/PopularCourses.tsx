
import { useState } from "react";
import CourseCard from "./CourseCard";

const popularCourses = [
  {
    id: 1,
    title: "Python Fundamentals",
    description: "Learn Python programming from scratch with hands-on exercises and projects.",
    level: "Beginner",
    duration: "8 weeks",
    progress: 0,
    lessons: 24,
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    description: "Master JavaScript fundamentals and modern ES6+ features.",
    level: "Beginner",
    duration: "10 weeks",
    progress: 0,
    lessons: 32,
  },
  {
    id: 3,
    title: "Java Programming",
    description: "Comprehensive Java course covering OOP concepts and more.",
    level: "Intermediate",
    duration: "12 weeks",
    progress: 0,
    lessons: 40,
  },
  {
    id: 4,
    title: "Advanced C++",
    description: "Deep dive into C++ with focus on performance and systems programming.",
    level: "Advanced",
    duration: "16 weeks",
    progress: 0,
    lessons: 48,
  },
] as const;

const PopularCourses = () => {
  const handleCourseClick = (courseId: number) => {
    console.log(`Navigating to course ${courseId}`);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl font-bold tracking-tight">
            Popular Courses
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your coding journey with our most popular courses
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideIn">
          {popularCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
