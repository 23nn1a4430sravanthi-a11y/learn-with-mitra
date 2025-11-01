import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Clock, Target, Check, Lock } from "lucide-react";

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

  const roadmapStages = [
    { 
      title: "Fundamentals", 
      status: "completed", 
      modules: ["Introduction to Programming", "Basic Syntax", "Variables & Data Types"],
      progress: 100
    },
    { 
      title: "Core Concepts", 
      status: "completed", 
      modules: ["Functions & Methods", "Control Flow", "Object-Oriented Programming"],
      progress: 100
    },
    { 
      title: "Advanced Topics", 
      status: "in-progress", 
      modules: ["Data Structures", "Algorithms", "Design Patterns"],
      progress: 65
    },
    { 
      title: "Specialization", 
      status: "locked", 
      modules: ["Web Development", "Machine Learning", "Mobile Development"],
      progress: 0
    },
    { 
      title: "Mastery", 
      status: "locked", 
      modules: ["Advanced Projects", "System Design", "Open Source Contribution"],
      progress: 0
    },
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

          {/* Visual Roadmap */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Your Learning Roadmap</CardTitle>
              <CardDescription>Track your journey from beginner to mastery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {roadmapStages.map((stage, index) => (
                  <div key={index} className="relative">
                    {/* Connection Line */}
                    {index < roadmapStages.length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-16 bg-border" />
                    )}
                    
                    <div className="flex gap-4">
                      {/* Status Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' 
                          ? 'bg-gradient-primary text-white' 
                          : stage.status === 'in-progress'
                          ? 'bg-accent/20 text-accent border-2 border-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {stage.status === 'completed' && <Check className="h-6 w-6" />}
                        {stage.status === 'in-progress' && <Target className="h-6 w-6" />}
                        {stage.status === 'locked' && <Lock className="h-5 w-5" />}
                      </div>

                      {/* Stage Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{stage.title}</h4>
                          <Badge variant={
                            stage.status === 'completed' ? 'default' : 
                            stage.status === 'in-progress' ? 'secondary' : 
                            'outline'
                          }>
                            {stage.status === 'completed' ? 'Completed' : 
                             stage.status === 'in-progress' ? 'In Progress' : 
                             'Locked'}
                          </Badge>
                        </div>
                        
                        {stage.status !== 'locked' && (
                          <>
                            <div className="mb-3">
                              <Progress value={stage.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">{stage.progress}% Complete</p>
                            </div>
                            <div className="space-y-1">
                              {stage.modules.map((module, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {module}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        
                        {stage.status === 'locked' && (
                          <p className="text-sm text-muted-foreground">
                            Complete previous stages to unlock
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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