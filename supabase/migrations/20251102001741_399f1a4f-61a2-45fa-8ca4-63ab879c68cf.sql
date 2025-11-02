-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text,
  avatar_url text,
  points integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  career_goal text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create career_paths table
CREATE TABLE public.career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  steps jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_course_progress table
CREATE TABLE public.user_course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress integer DEFAULT 0,
  status text DEFAULT 'not_started',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  requirement text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id uuid REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create daily_activity table for streak tracking
CREATE TABLE public.daily_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_date date NOT NULL,
  points_earned integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, activity_date)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- RLS Policies for career_paths (public read)
CREATE POLICY "Anyone can view career paths"
ON public.career_paths FOR SELECT
USING (true);

-- RLS Policies for user_course_progress
CREATE POLICY "Users can view own progress"
ON public.user_course_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
ON public.user_course_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
ON public.user_course_progress FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for badges (public read)
CREATE POLICY "Anyone can view badges"
ON public.badges FOR SELECT
USING (true);

-- RLS Policies for user_badges
CREATE POLICY "Users can view own badges"
ON public.user_badges FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
ON public.user_badges FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for daily_activity
CREATE POLICY "Users can view own activity"
ON public.daily_activity FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
ON public.daily_activity FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, requirement) VALUES
('First Step', 'Complete your first course', '🎯', 'complete_first_course'),
('Week Warrior', 'Maintain a 7-day streak', '🔥', 'streak_7'),
('Month Master', 'Maintain a 30-day streak', '⚡', 'streak_30'),
('Century Club', 'Earn 100 points', '💯', 'points_100'),
('Dedicated Learner', 'Complete 5 courses', '📚', 'courses_5'),
('Quiz Master', 'Score 100% on 10 quizzes', '🏆', 'perfect_quizzes_10');

-- Insert sample career paths
INSERT INTO public.career_paths (name, description, steps) VALUES
('Web Developer', 'Build modern web applications', '[
  {"title": "HTML & CSS", "description": "Web structure and styling", "duration": "2 weeks"},
  {"title": "JavaScript", "description": "Programming fundamentals", "duration": "4 weeks"},
  {"title": "React", "description": "Modern UI development", "duration": "6 weeks"},
  {"title": "Node.js", "description": "Backend development", "duration": "4 weeks"},
  {"title": "Database & APIs", "description": "Data management", "duration": "3 weeks"}
]'),
('Data Scientist', 'Analyze and visualize data', '[
  {"title": "Python Basics", "description": "Programming fundamentals", "duration": "3 weeks"},
  {"title": "Statistics", "description": "Data analysis foundation", "duration": "4 weeks"},
  {"title": "Pandas & NumPy", "description": "Data manipulation", "duration": "3 weeks"},
  {"title": "Machine Learning", "description": "Predictive models", "duration": "8 weeks"},
  {"title": "Deep Learning", "description": "Neural networks", "duration": "6 weeks"}
]'),
('Mobile Developer', 'Create mobile applications', '[
  {"title": "Programming Basics", "description": "Core concepts", "duration": "3 weeks"},
  {"title": "React Native", "description": "Cross-platform development", "duration": "6 weeks"},
  {"title": "Mobile UI/UX", "description": "Design principles", "duration": "2 weeks"},
  {"title": "APIs & Backend", "description": "Server integration", "duration": "4 weeks"},
  {"title": "Publishing", "description": "App store deployment", "duration": "1 week"}
]'),
('UI/UX Designer', 'Design beautiful user experiences', '[
  {"title": "Design Principles", "description": "Visual fundamentals", "duration": "2 weeks"},
  {"title": "Figma", "description": "Design tools", "duration": "3 weeks"},
  {"title": "User Research", "description": "Understanding users", "duration": "2 weeks"},
  {"title": "Prototyping", "description": "Interactive designs", "duration": "3 weeks"},
  {"title": "Design Systems", "description": "Scalable design", "duration": "4 weeks"}
]')