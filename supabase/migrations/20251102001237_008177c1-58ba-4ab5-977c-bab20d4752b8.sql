-- Create courses table
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  difficulty text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create youtube_channels table
CREATE TABLE public.youtube_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name text NOT NULL,
  channel_url text NOT NULL,
  description text,
  subscriber_count text,
  category text NOT NULL,
  thumbnail_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_channels ENABLE ROW LEVEL SECURITY;

-- Public read access for courses
CREATE POLICY "Anyone can view courses"
ON public.courses FOR SELECT
USING (true);

-- Public read access for youtube channels
CREATE POLICY "Anyone can view youtube channels"
ON public.youtube_channels FOR SELECT
USING (true);

-- Insert sample courses
INSERT INTO public.courses (title, description, category, difficulty) VALUES
('Web Development Fundamentals', 'Learn HTML, CSS, and JavaScript basics', 'Web Development', 'Beginner'),
('React Mastery', 'Master React and modern frontend development', 'Web Development', 'Intermediate'),
('Python for Data Science', 'Learn Python programming for data analysis', 'Data Science', 'Beginner'),
('Machine Learning Basics', 'Introduction to ML algorithms and applications', 'AI/ML', 'Intermediate'),
('Mobile App Development', 'Build mobile apps with React Native', 'Mobile Development', 'Intermediate');

-- Insert sample YouTube channels
INSERT INTO public.youtube_channels (channel_name, channel_url, description, subscriber_count, category, thumbnail_url) VALUES
('Traversy Media', 'https://www.youtube.com/@TraversyMedia', 'Web development tutorials and crash courses', '2.2M', 'Web Development', 'https://yt3.googleusercontent.com/ytc/AIdro_kGRCVKHx8lmbHT-3WSIirhjWqMBNOPKoKvqMvQoI1B_Q=s176-c-k-c0x00ffffff-no-rj'),
('freeCodeCamp.org', 'https://www.youtube.com/@freecodecamp', 'Free coding tutorials and full courses', '9.3M', 'Web Development', 'https://yt3.googleusercontent.com/ytc/AIdro_mKzklyPPhDYCEp2-L8RHhD4vXUxvbD1kTiFCXxI_obTA=s176-c-k-c0x00ffffff-no-rj'),
('Fireship', 'https://www.youtube.com/@Fireship', 'High-intensity coding tutorials', '3.2M', 'Web Development', 'https://yt3.googleusercontent.com/ytc/AIdro_kGRCVKHx8lmbHT-3WSIirhjWqMBNOPKoKvqMvQoI1B_Q=s176-c-k-c0x00ffffff-no-rj'),
('Corey Schafer', 'https://www.youtube.com/@coreyms', 'Python programming tutorials', '1.3M', 'Data Science', 'https://yt3.googleusercontent.com/ytc/AIdro_kGRCVKHx8lmbHT-3WSIirhjWqMBNOPKoKvqMvQoI1B_Q=s176-c-k-c0x00ffffff-no-rj'),
('StatQuest with Josh Starmer', 'https://www.youtube.com/@statquest', 'Statistics and machine learning explained clearly', '1.4M', 'AI/ML', 'https://yt3.googleusercontent.com/ytc/AIdro_kGRCVKHx8lmbHT-3WSIirhjWqMBNOPKoKvqMvQoI1B_Q=s176-c-k-c0x00ffffff-no-rj'),
('William Candillon', 'https://www.youtube.com/@wcandillon', 'React Native animations and tutorials', '90K', 'Mobile Development', 'https://yt3.googleusercontent.com/ytc/AIdro_kGRCVKHx8lmbHT-3WSIirhjWqMBNOPKoKvqMvQoI1B_Q=s176-c-k-c0x00ffffff-no-rj')