import { useState } from "react";
import { Upload, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface UploadPageProps {
  onBack: () => void;
}

export function UploadPage({ onBack }: UploadPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a video title");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            toast.success("Video uploaded successfully!");
            // Reset form
            setTitle("");
            setDescription("");
            setTags("");
            setThumbnail(null);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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

        <div className="bg-white rounded-[var(--yt-border-radius)] shadow-[var(--yt-box-shadow)] p-8">
          <h1 className="mb-6">Upload Video</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Thumbnail Upload */}
            <div>
              <label className="block mb-2">Video Thumbnail</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[var(--yt-accent-color)] transition-colors cursor-pointer">
                {thumbnail ? (
                  <div className="relative">
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnail(null)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">Click to upload thumbnail</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors"
                disabled={isUploading}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors resize-none"
                disabled={isUploading}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Separate tags with commas (e.g., React, TypeScript, Tutorial)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--yt-accent-color)] transition-colors"
                disabled={isUploading}
              />
            </div>

            {/* Privacy */}
            <div>
              <label className="block mb-3">Privacy</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  disabled={isUploading}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                    isPublic
                      ? "border-[var(--yt-accent-color)] bg-[var(--yt-accent-color)]/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  disabled={isUploading}
                  className={`flex-1 py-3 px-6 rounded-lg border-2 transition-all ${
                    !isPublic
                      ? "border-[var(--yt-accent-color)] bg-[var(--yt-accent-color)]/10"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Private
                </button>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--yt-accent-color)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3 px-6 text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ backgroundColor: 'var(--yt-main-color)' }}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
