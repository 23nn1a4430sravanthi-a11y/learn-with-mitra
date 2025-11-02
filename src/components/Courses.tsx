import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("difficulty", { ascending: true });

    if (!error && data) {
      setCourses(data);
    }
    setLoading(false);
  };

  const categories = [...new Set(courses.map((c) => c.category))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-success/20 text-success";
      case "intermediate":
        return "bg-primary/20 text-primary";
      case "advanced":
        return "bg-accent/20 text-accent";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center">Loading courses...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Available Courses
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose from our wide range of courses across different fields
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((course) => course.category === category)
                .map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full gap-2">
                        <Clock className="h-4 w-4" />
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
