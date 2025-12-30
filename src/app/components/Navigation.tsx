import { Search, Upload, User, Bell, Menu } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 border-b border-gray-200/50 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1920px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--yt-main-color)' }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="font-semibold">VideoStream</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full px-4 py-2 pl-4 pr-12 rounded-full border border-gray-300 bg-white focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors"
              />
              <button
                className="absolute right-0 top-0 h-full px-6 rounded-r-full hover:bg-gray-100 transition-colors"
                style={{ backgroundColor: 'var(--yt-background-start)' }}
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("upload")}
              className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-105"
              title="Upload video"
            >
              <Upload className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-105"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate("profile")}
              className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-105"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
