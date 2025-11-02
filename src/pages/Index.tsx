import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChatDemo from "@/components/ChatDemo";
import Courses from "@/components/Courses";
import ProgressDashboard from "@/components/ProgressDashboard";
import YouTubeChannels from "@/components/YouTubeChannels";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Courses />
      <ChatDemo />
      <ProgressDashboard />
      <YouTubeChannels />
      <Footer />
    </div>
  );
};

export default Index;