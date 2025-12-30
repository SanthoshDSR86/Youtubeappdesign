import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { VideoPlayer } from "./components/VideoPlayer";
import { UploadPage } from "./components/UploadPage";
import { ProfilePage } from "./components/ProfilePage";
import { SettingsPage } from "./components/SettingsPage";
import { mockVideos, mockComments, mockUser } from "./data/mockData";
import { Comment } from "./types";
import { Toaster } from "./components/ui/sonner";

type Page = "home" | "video" | "upload" | "profile" | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    setSelectedVideoId(null);
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideoId(videoId);
    setCurrentPage("video");
  };

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `c${comments.length + 1}`,
      userId: mockUser.id,
      userName: mockUser.name,
      userAvatar: mockUser.avatar,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
    };
    setComments([newComment, ...comments]);
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedVideoId(null);
  };

  const selectedVideo = selectedVideoId 
    ? mockVideos.find(v => v.id === selectedVideoId)
    : null;

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === "home" && (
        <HomePage videos={mockVideos} onVideoClick={handleVideoClick} />
      )}
      
      {currentPage === "video" && selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          comments={comments}
          onAddComment={handleAddComment}
          onBack={handleBackToHome}
        />
      )}
      
      {currentPage === "upload" && (
        <UploadPage onBack={handleBackToHome} />
      )}
      
      {currentPage === "profile" && (
        <ProfilePage
          user={mockUser}
          onBack={handleBackToHome}
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === "settings" && (
        <SettingsPage onBack={handleBackToHome} />
      )}

      <Toaster position="bottom-center" />
    </div>
  );
}
