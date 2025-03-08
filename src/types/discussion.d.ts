
export interface Thread {
  id: string;
  title: string;
  category: string;
  courseId?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  authorName: string;
  authorAvatar?: string | null;
  messageCount: number;
  lastActivity: Date;
  isPinned: boolean;
  isLocked: boolean;
  replyCount: number;
  participantCount: number;
}

export interface Message {
  id: string;
  threadId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  userName: string;
  userAvatar: string | null;
  parentId: string | null;
  likes: number;
  isEdited: boolean;
}

export type MessageFormData = {
  content: string;
  parentId?: string | null;
};

export type Category = {
  id: string;
  name: string;
  color?: string;
};

export type ThreadCategory = {
  id: string;
  name: string;
  description?: string;
  color: string;
};
