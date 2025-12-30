import { useState } from "react";
import { Bell, Lock, User, HelpCircle, Mail } from "lucide-react";
import { toast } from "sonner";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-6" 
      style={{ 
        background: `linear-gradient(to bottom, var(--yt-background-start), var(--yt-background-end))` 
      }}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 rounded-lg bg-white hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>

        <h1 className="mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-6 h-6" style={{ color: 'var(--yt-accent-color)' }} />
              <h2>Account Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue="John Creator"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors"
                />
              </div>
              <div>
                <label className="block mb-2">Bio</label>
                <textarea
                  defaultValue="Content creator | Tech enthusiast | Sharing my journey with the world"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6" style={{ color: 'var(--yt-accent-color)' }} />
              <h2>Notification Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-semibold">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--yt-accent-color)]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-semibold">Push Notifications</p>
                  <p className="text-sm text-gray-600">Get notified in your browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--yt-accent-color)]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Playback Settings */}
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" fill="var(--yt-accent-color)" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <h2>Playback</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div>
                  <p className="font-semibold">Autoplay</p>
                  <p className="text-sm text-gray-600">Automatically play next video</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoplay}
                    onChange={(e) => setAutoplay(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--yt-accent-color)]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6" style={{ color: 'var(--yt-accent-color)' }} />
              <h2>Privacy & Security</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6" style={{ color: 'var(--yt-accent-color)' }} />
              <h2>Help & Support</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Help Center
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Support
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Terms of Service
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-3 px-6 text-white rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--yt-main-color)' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
