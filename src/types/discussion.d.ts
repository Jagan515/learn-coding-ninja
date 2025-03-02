
export interface Thread {
  id: string;
  title: string;
  category: string;
  courseId?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  participantCount: number;
  replyCount: number;
  isPinned: boolean;
  isLocked: boolean;
}

export interface Message {
  id: string;
  threadId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  parentId?: string;
  likes: number;
  isEdited: boolean;
}

export interface ThreadCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}
