import { useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Video, Comment } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface VideoPlayerProps {
  video: Video;
  comments: Comment[];
  onAddComment: (content: string) => void;
  onBack: () => void;
}

export function VideoPlayer({ video, comments, onAddComment, onBack }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText("");
      setIsFocused(false);
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  return (
    <div className="min-h-screen pt-20 pb-8" 
      style={{ 
        background: `linear-gradient(to bottom, var(--yt-background-start), var(--yt-background-end))` 
      }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div
              className="relative aspect-video bg-black rounded-[var(--yt-border-radius)] overflow-hidden cursor-pointer group"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {/* Video Thumbnail (placeholder) */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--yt-main-color)' }}>
                    <Play className="w-10 h-10 text-white ml-2" />
                  </div>
                </div>
              )}

              {/* Controls */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                  >
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="w-full h-1 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, var(--yt-main-color) ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
                        }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(!isPlaying);
                          }}
                          className="text-white hover:scale-110 transition-transform"
                        >
                          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                          }}
                          className="text-white hover:scale-110 transition-transform"
                        >
                          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                        </button>
                        <span className="text-white text-sm">{video.duration}</span>
                      </div>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-white hover:scale-110 transition-transform"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Video Info */}
            <div className="mt-4 p-4 bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)]">
              <h1 className="mb-3">{video.title}</h1>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={video.channelAvatar}
                    alt={video.channelName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{video.channelName}</p>
                    <p className="text-sm text-gray-600">
                      {formatViews(video.views)} views
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--yt-background-start)' }}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{formatNumber(video.likes)}</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--yt-background-start)' }}
                  >
                    <ThumbsDown className="w-5 h-5" />
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                    style={{ backgroundColor: 'var(--yt-background-start)' }}
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--yt-background-start)' }}>
                <p className="text-gray-700">{video.description}</p>
                <div className="flex gap-2 mt-3">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: 'var(--yt-accent-color)',
                        color: 'white'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6 p-4 bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)]">
              <h3 className="mb-4">{comments.length} Comments</h3>

              {/* Add Comment */}
              <div className="mb-6">
                <div className="flex gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <motion.textarea
                      animate={{ height: isFocused ? "100px" : "40px" }}
                      transition={{ duration: 0.2 }}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      placeholder="Add a comment..."
                      className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-[var(--yt-accent-color)] outline-none resize-none transition-colors"
                    />
                    {isFocused && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end gap-2 mt-2"
                      >
                        <button
                          onClick={() => {
                            setCommentText("");
                            setIsFocused(false);
                          }}
                          className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmitComment}
                          disabled={!commentText.trim()}
                          className="px-4 py-2 rounded-full text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                          style={{ backgroundColor: 'var(--yt-accent-color)' }}
                        >
                          Comment
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.userName}</span>
                        <span className="text-sm text-gray-500">
                          {getTimeAgo(comment.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Videos Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="mb-4 px-4">Related Videos</h3>
              <div className="space-y-3">
                {/* Placeholder for related videos */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Related videos would appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
