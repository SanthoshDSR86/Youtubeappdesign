import { User } from "../types";
import { Settings, Edit } from "lucide-react";

interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function ProfilePage({ user, onBack, onNavigate }: ProfilePageProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-6" 
      style={{ 
        background: `linear-gradient(to bottom, var(--yt-background-start), var(--yt-background-end))` 
      }}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h1 className="mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-gray-600">
                  {formatNumber(user.subscriberCount)} subscribers
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="p-3 rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--yt-background-start)' }}
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate("settings")}
                className="p-3 rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--yt-background-start)' }}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--yt-background-start)' }}>
            <h3 className="mb-2">About</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--yt-main-color)' }}>
              0
            </div>
            <div className="text-gray-600">Videos Uploaded</div>
          </div>
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--yt-accent-color)' }}>
              {formatNumber(user.subscriberCount)}
            </div>
            <div className="text-gray-600">Subscribers</div>
          </div>
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--yt-main-color)' }}>
              0
            </div>
            <div className="text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)]">
          <div className="flex border-b border-gray-200">
            <button className="px-6 py-4 font-semibold border-b-2 transition-colors"
              style={{ 
                borderBottomColor: 'var(--yt-main-color)',
                color: 'var(--yt-main-color)'
              }}>
              Videos
            </button>
            <button className="px-6 py-4 text-gray-600 hover:text-gray-900 transition-colors">
              Liked
            </button>
            <button className="px-6 py-4 text-gray-600 hover:text-gray-900 transition-colors">
              Playlists
            </button>
          </div>

          <div className="p-8 text-center text-gray-600">
            <p>No videos uploaded yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
