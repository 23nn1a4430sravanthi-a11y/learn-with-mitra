import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Clock, Target, Flame } from "lucide-react";

const ProgressDashboard = () => {
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    hoursLearned: 0,
    quizAverage: 0,
    points: 0,
    currentStreak: 0,
    badges: 0
  });
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("points, current_streak")
          .eq("id", user.id)
          .single();

        // Fetch completed courses
        const { data: completedCourses } = await supabase
          .from("user_course_progress")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "completed");

        // Fetch user badges
        const { data: userBadges } = await supabase
          .from("user_badges")
          .select("*, badges(*)")
          .eq("user_id", user.id);

        setStats({
          coursesCompleted: completedCourses?.length || 0,
          hoursLearned: (completedCourses?.length || 0) * 20,
          quizAverage: 88,
          points: profile?.points || 0,
          currentStreak: profile?.current_streak || 0,
          badges: userBadges?.length || 0
        });

        setBadges(userBadges || []);
      } else {
        // Demo data for non-logged-in users
        setStats({
          coursesCompleted: 12,
          hoursLearned: 156,
          quizAverage: 88,
          points: 1250,
          currentStreak: 7,
          badges: 4
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: BookOpen, label: "Courses Completed", value: stats.coursesCompleted, color: "text-primary" },
    { icon: Clock, label: "Hours Learned", value: stats.hoursLearned, color: "text-accent" },
    { icon: Target, label: "Points Earned", value: stats.points, color: "text-success" },
    { icon: Flame, label: "Current Streak", value: `${stats.currentStreak} days`, color: "text-accent" },
  ];

  if (loading) {
    return (
      <section className="py-24 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center">Loading your progress...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Your Learning Progress
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your achievements and earn rewards as you learn
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
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

          {/* Badges & Rewards */}
          <Card className="shadow-card border-accent/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Badges & Achievements
              </CardTitle>
              <CardDescription>
                Earn 100 points per completed course to unlock premium features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">💰</div>
                    <div>
                      <p className="font-semibold">Total Points</p>
                      <p className="text-sm text-muted-foreground">
                        Use points to unlock premium subscriptions
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary">{stats.points}</p>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {badges.slice(0, 6).map((userBadge: any) => (
                    <div
                      key={userBadge.id}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20"
                      title={userBadge.badges?.description}
                    >
                      <span className="text-3xl">{userBadge.badges?.icon}</span>
                      <span className="text-xs font-medium text-center">
                        {userBadge.badges?.name}
                      </span>
                    </div>
                  ))}
                  {[...Array(Math.max(0, 6 - badges.length))].map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 border border-dashed border-muted"
                    >
                      <span className="text-3xl opacity-30">🔒</span>
                      <span className="text-xs text-muted-foreground">Locked</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streak Tracker */}
          <Card className="border-accent/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-accent" />
                Daily Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center flex-col gap-4">
                <div className="relative">
                  <Flame className="h-20 w-20 text-accent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{stats.currentStreak}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Keep learning daily to maintain your streak and earn special badges!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;
