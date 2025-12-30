import { Video } from "../types";
import { motion } from "motion/react";

interface VideoCardProps {
  video: Video;
  onVideoClick: (videoId: string) => void;
}

export function VideoCard({ video, onVideoClick }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, opacity: 0.8 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={() => onVideoClick(video.id)}
    >
      <div className="rounded-[var(--yt-border-radius)] overflow-hidden bg-white shadow-[var(--yt-box-shadow)]">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gray-200">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
            {video.duration}
          </div>
        </div>

        {/* Video Info */}
        <div className="p-3">
          <div className="flex gap-3">
            <img
              src={video.channelAvatar}
              alt={video.channelName}
              className="w-9 h-9 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-2 mb-1">
                {video.title}
              </h3>
              <p className="text-sm text-gray-600">{video.channelName}</p>
              <p className="text-sm text-gray-600">
                {formatViews(video.views)} views • {getTimeAgo(video.uploadDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
