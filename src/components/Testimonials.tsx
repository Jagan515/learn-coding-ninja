
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael Johnson",
    role: "Software Developer",
    avatar: "MJ",
    content: "CodeNinja transformed my career. I went from knowing nothing about programming to landing a full-time developer role in just 6 months.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "CS Student",
    avatar: "SW",
    content: "The interactive exercises and projects helped me understand complex concepts that I struggled with in my university classes.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Data Analyst",
    avatar: "DC",
    content: "I needed to learn Python for data analysis quickly. The Python course was perfectly structured and the AI assistant was incredibly helpful.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied learners who have advanced their programming skills with CodeNinja
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                  
                  <blockquote className="text-muted-foreground mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
