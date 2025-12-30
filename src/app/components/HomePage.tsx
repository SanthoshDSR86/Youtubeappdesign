import { Video } from "../types";
import { VideoCard } from "./VideoCard";

interface HomePageProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
}

export function HomePage({ videos, onVideoClick }: HomePageProps) {
  return (
    <div className="min-h-screen pt-20 pb-8 px-6" 
      style={{ 
        background: `linear-gradient(to bottom, var(--yt-background-start), var(--yt-background-end))` 
      }}>
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Trending Videos</h1>
          <p className="text-gray-600">Discover the most popular content</p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} onVideoClick={onVideoClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
