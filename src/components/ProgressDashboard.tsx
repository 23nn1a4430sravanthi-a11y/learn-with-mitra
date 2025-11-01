import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Clock, Target, Check, Lock, MapPin, TrendingUp } from "lucide-react";

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

  // Career Goal: Data Analyst
  const careerGoal = "Data Analyst";
  const currentStep = 1; // 0-based index (Excel = 1)
  
  const careerRoadmap = [
    { 
      title: "Mathematics", 
      description: "Statistics, Probability, Linear Algebra",
      status: "completed",
      progress: 100,
      duration: "4 weeks"
    },
    { 
      title: "Excel", 
      description: "Formulas, Pivot Tables, Data Visualization",
      status: "current",
      progress: 60,
      duration: "3 weeks"
    },
    { 
      title: "SQL", 
      description: "Queries, Joins, Database Design",
      status: "locked",
      progress: 0,
      duration: "4 weeks"
    },
    { 
      title: "Power BI", 
      description: "Dashboards, DAX, Data Modeling",
      status: "locked",
      progress: 0,
      duration: "3 weeks"
    },
    { 
      title: "Python", 
      description: "Pandas, NumPy, Data Analysis",
      status: "locked",
      progress: 0,
      duration: "6 weeks"
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Target className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Career Goal</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {careerGoal}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow your personalized roadmap and track your progress in real-time
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

          {/* Career Roadmap Path */}
          <Card className="shadow-card border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Your Career Roadmap
                  </CardTitle>
                  <CardDescription>Step-by-step path to becoming a {careerGoal}</CardDescription>
                </div>
                <Badge className="bg-gradient-primary">
                  Step {currentStep + 1} of {careerRoadmap.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-border" />
                <div 
                  className="absolute left-8 top-0 w-1 bg-gradient-primary transition-all duration-1000"
                  style={{ 
                    height: `${(currentStep / (careerRoadmap.length - 1)) * 100}%` 
                  }}
                />

                <div className="space-y-8">
                  {careerRoadmap.map((step, index) => {
                    const isCurrent = index === currentStep;
                    const isCompleted = step.status === 'completed';
                    const isLocked = step.status === 'locked';
                    
                    return (
                      <div key={index} className="relative">
                        <div className="flex gap-6">
                          {/* Status Node */}
                          <div className="relative flex-shrink-0">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 relative transition-all duration-300 ${
                              isCurrent
                                ? 'bg-gradient-primary text-white shadow-glow ring-4 ring-primary/20 animate-pulse'
                                : isCompleted
                                ? 'bg-gradient-primary text-white shadow-card'
                                : 'bg-muted text-muted-foreground border-2 border-border'
                            }`}>
                              {isCurrent && <MapPin className="h-7 w-7" />}
                              {isCompleted && <Check className="h-7 w-7" />}
                              {isLocked && <Lock className="h-6 w-6" />}
                            </div>
                            
                            {/* Current Position Indicator */}
                            {isCurrent && (
                              <div className="absolute -right-3 top-0 animate-bounce">
                                <div className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap shadow-elevated">
                                  You are here
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Step Content */}
                          <div className={`flex-1 pb-8 transition-all duration-300 ${
                            isCurrent ? 'scale-105' : ''
                          }`}>
                            <Card className={`transition-all duration-300 ${
                              isCurrent 
                                ? 'border-primary shadow-elevated bg-primary/5' 
                                : isCompleted
                                ? 'border-success/50 bg-success/5'
                                : 'border-border bg-card'
                            }`}>
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <CardTitle className={`text-xl mb-1 ${
                                      isCurrent ? 'text-primary' : ''
                                    }`}>
                                      {step.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                      {step.description}
                                    </CardDescription>
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <Badge variant={
                                      isCompleted ? 'default' : 
                                      isCurrent ? 'secondary' : 
                                      'outline'
                                    } className="shrink-0">
                                      {isCompleted ? '✓ Done' : 
                                       isCurrent ? 'In Progress' : 
                                       'Upcoming'}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {step.duration}
                                    </span>
                                  </div>
                                </div>
                              </CardHeader>
                              
                              {!isLocked && (
                                <CardContent className="pt-0">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-muted-foreground">Progress</span>
                                      <span className="font-semibold">{step.progress}%</span>
                                    </div>
                                    <Progress value={step.progress} className="h-2" />
                                    
                                    {isCurrent && step.progress < 100 && (
                                      <p className="text-xs text-muted-foreground mt-2">
                                        Keep going! You're {100 - step.progress}% away from completion.
                                      </p>
                                    )}
                                  </div>
                                </CardContent>
                              )}
                            </Card>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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