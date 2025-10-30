import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Clock, Target } from "lucide-react";

const ProgressDashboard = () => {
  const courses = [
    { name: "Python Programming", progress: 75, status: "In Progress", color: "bg-primary" },
    { name: "Web Development", progress: 45, status: "In Progress", color: "bg-accent" },
    { name: "Data Structures", progress: 90, status: "Almost Done", color: "bg-success" },
  ];

  const stats = [
    { icon: BookOpen, label: "Courses Completed", value: "12", color: "text-primary" },
    { icon: Clock, label: "Hours Learned", value: "156", color: "text-accent" },
    { icon: Target, label: "Quiz Score Avg", value: "88%", color: "text-success" },
    { icon: Award, label: "Certificates", value: "8", color: "text-primary" },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Track Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Visual roadmap showing your progress, achievements, and next steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-card transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-primary`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Course Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Current Courses</CardTitle>
              <CardDescription>Your active learning paths and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{course.name}</h4>
                      <Badge variant={course.progress >= 80 ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Next Steps */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-primary/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Suggested Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Build a Weather App with Python
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Create a Portfolio Website
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    Data Analysis Project
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-accent/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Internship Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Junior Web Developer - Remote
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Python Intern - Tech Startup
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    Data Analyst Trainee
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;