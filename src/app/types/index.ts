export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  uploadDate: string;
  duration: string;
  description: string;
  tags: string[];
  likes: number;
  dislikes: number;
  videoUrl: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  subscriberCount: number;
}
