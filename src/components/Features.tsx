
import { motion } from "framer-motion";
import { Code, Zap, BookOpen, Users, Trophy, Brain } from "lucide-react";

const features = [
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Interactive Coding",
    description: "Practice coding directly in your browser with our built-in code editor and instant feedback."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Learn at Your Pace",
    description: "Follow a structured learning path or jump to specific topics that interest you most."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Comprehensive Curriculum",
    description: "From basics to advanced topics, our courses cover everything you need to become proficient."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Community Support",
    description: "Connect with other learners, ask questions, and collaborate on coding challenges."
  },
  {
    icon: <Trophy className="h-10 w-10 text-primary" />,
    title: "Earn Certificates",
    description: "Showcase your skills with certificates upon completion of courses and tracks."
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "AI-Powered Learning",
    description: "Receive personalized help and feedback from our advanced AI assistant."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            Why Learn With <span className="gradient-text">CodeNinja</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform offers everything you need to master programming skills and build your career
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
