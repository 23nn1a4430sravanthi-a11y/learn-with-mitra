import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users } from "lucide-react";

interface YouTubeChannel {
  id: string;
  channel_name: string;
  channel_url: string;
  description: string;
  subscriber_count: string;
  category: string;
  thumbnail_url: string;
}

const YouTubeChannels = () => {
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    const { data, error } = await supabase
      .from("youtube_channels")
      .select("*")
      .order("subscriber_count", { ascending: false });

    if (!error && data) {
      setChannels(data);
    }
    setLoading(false);
  };

  const categories = [...new Set(channels.map((ch) => ch.category))];

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center">Loading channels...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Learn from the Best</h2>
          <p className="text-muted-foreground text-lg">
            Top YouTube channels curated for your learning journey
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {channels
                .filter((ch) => ch.category === category)
                .map((channel) => (
                  <Card key={channel.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {channel.channel_name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {channel.subscriber_count} subscribers
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {channel.description}
                      </p>
                      <a
                        href={channel.channel_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        Visit Channel <ExternalLink className="w-4 h-4" />
                      </a>
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

export default YouTubeChannels;
