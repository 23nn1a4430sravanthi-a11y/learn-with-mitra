import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Brain, Trophy, TrendingUp, Users, Globe } from "lucide-react";
import aiChatIcon from "@/assets/ai-chat-icon.png";
import quizIcon from "@/assets/quiz-icon.png";
import progressIcon from "@/assets/progress-icon.png";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      image: aiChatIcon,
      title: "AI Teacher Chat",
      description: "Ask questions by voice or text and get instant, personalized explanations with images and audio.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      image: quizIcon,
      title: "Smart Quizzes",
      description: "Test your knowledge with AI-generated quizzes that adapt to your learning level and progress.",
      gradient: "from-accent to-accent/80"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      image: progressIcon,
      title: "Progress Roadmap",
      description: "Visual roadmap showing your learning journey, completed courses, and upcoming milestones.",
      gradient: "from-success to-success/80"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Projects & Internships",
      description: "Get personalized project and internship recommendations based on your quiz scores and skills.",
      gradient: "from-primary to-accent"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Real Mentors",
      description: "Connect with experienced mentors for guidance, career advice, and personalized support.",
      gradient: "from-accent to-primary"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Multi-Language Support",
      description: "Learn in your preferred language with AI-powered translation and localized content.",
      gradient: "from-success to-primary"
    }
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Master Any Subject
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive learning tools powered by cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden"
            >
              <CardHeader>
                <div className="mb-4 relative">
                  {feature.image ? (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-md`}>
                      {feature.icon}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;