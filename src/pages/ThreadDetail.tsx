
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pin, Lock, AlertTriangle, ThumbsUp } from "lucide-react";
import { Thread, Message } from "@/types/discussion";
import MessageItem from "@/components/discussion/MessageItem";
import MessageEditor from "@/components/discussion/MessageEditor";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock data - would be replaced with API calls
const mockThread: Thread = {
  id: "1",
  title: "What are the best practices for React state management?",
  category: "React",
  createdAt: "2023-10-15T10:30:00Z",
  updatedAt: "2023-10-16T14:25:00Z",
  createdBy: {
    id: "user1",
    name: "Jane Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
  },
  participantCount: 8,
  replyCount: 15,
  isPinned: true,
  isLocked: false
};

// Mock messages
const mockMessages: Message[] = [
  {
    id: "msg1",
    threadId: "1",
    content: "I've been learning React and I'm curious about the best practices for state management. I've heard about Redux, Context API, and other solutions. What do you all recommend for different project sizes?",
    createdAt: "2023-10-15T10:30:00Z",
    userId: "user1",
    userName: "Jane Doe",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    likes: 5,
    isEdited: false
  },
  {
    id: "msg2",
    threadId: "1",
    content: "For small to medium projects, I usually stick with React's built-in useState and useReducer hooks. They're often enough without the extra complexity of Redux.",
    createdAt: "2023-10-15T11:15:00Z",
    userId: "user2",
    userName: "John Smith",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    likes: 8,
    isEdited: false
  },
  {
    id: "msg3",
    threadId: "1",
    content: "I agree with John. Additionally, Context API can be great for sharing state between components that aren't directly connected. Redux makes more sense for larger applications with complex state interactions.",
    createdAt: "2023-10-15T12:40:00Z",
    userId: "user3",
    userName: "Alex Johnson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    parentId: "msg2",
    likes: 3,
    isEdited: true
  }
];

const ThreadDetail = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thread, setThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

  // Fetch thread and messages
  useEffect(() => {
    // This would be replaced with an API call
    setThread(mockThread);
    setMessages(mockMessages);
  }, [threadId]);

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p>Loading thread...</p>
        </main>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/discussion");
  };

  const handleSendMessage = (content: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (thread.isLocked) {
      console.log("This thread is locked");
      return;
    }

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      threadId: thread.id,
      content,
      createdAt: new Date().toISOString(),
      userId: user.id,
      userName: user.email || "Anonymous",
      parentId: replyTo?.id,
      likes: 0,
      isEdited: false
    };

    setMessages((prev) => [...prev, newMessage]);
    setReplyTo(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const handleLikeMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  const handleReply = (message: Message) => {
    setReplyTo(message);
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  // Organize messages into a threaded structure
  const rootMessages = messages.filter((msg) => !msg.parentId);
  const messageReplies = messages.filter((msg) => msg.parentId);

  const getMessageReplies = (messageId: string): Message[] => {
    return messageReplies.filter((msg) => msg.parentId === messageId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Discussions
            </Button>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {thread.isPinned && <Pin className="h-5 w-5 text-primary" />}
                  <h1 className="text-2xl font-bold">{thread.title}</h1>
                  {thread.isLocked && (
                    <div className="ml-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Locked
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{thread.category}</Badge>
                  <span>•</span>
                  <span>Started by {thread.createdBy.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thread content */}
          <div className="bg-card rounded-lg overflow-hidden border">
            <ScrollArea className="h-[600px] px-4">
              <div className="py-4 space-y-6">
                {rootMessages.map((message) => (
                  <MessageItem
                    key={message.id}
                    message={message}
                    currentUserId={user?.id}
                    onDelete={handleDeleteMessage}
                    onLike={handleLikeMessage}
                    onReply={handleReply}
                    replies={getMessageReplies(message.id)}
                  />
                ))}
              </div>
            </ScrollArea>

            {thread.isLocked ? (
              <div className="p-4 bg-muted/50 flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  This thread has been locked and is read-only
                </p>
              </div>
            ) : (
              <div className="p-4 border-t">
                <MessageEditor
                  onSend={handleSendMessage}
                  isAuthenticated={!!user}
                  replyTo={replyTo}
                  onCancelReply={cancelReply}
                  isDisabled={thread.isLocked}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThreadDetail;
