
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pin, Lock, AlertTriangle } from "lucide-react";
import { Thread, Message } from "@/types/discussion";
import MessageItem from "@/components/discussion/MessageItem";
import MessageEditor from "@/components/discussion/MessageEditor";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ThreadDetail = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [thread, setThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch thread and messages
  useEffect(() => {
    const fetchThreadAndMessages = async () => {
      setIsLoading(true);
      try {
        if (!threadId) return;

        // Fetch thread details
        const { data: threadData, error: threadError } = await supabase
          .from('discussion_threads')
          .select(`
            id, 
            title, 
            category, 
            course_id, 
            created_at, 
            updated_at, 
            created_by,
            is_pinned,
            is_locked,
            profiles:created_by (id, full_name, avatar_url)
          `)
          .eq('id', threadId)
          .single();

        if (threadError) throw threadError;

        if (!threadData) {
          toast({
            title: "Thread not found",
            description: "The discussion thread you're looking for doesn't exist.",
            variant: "destructive",
          });
          navigate("/discussion");
          return;
        }

        // Format thread data
        const formattedThread: Thread = {
          id: threadData.id,
          title: threadData.title,
          category: threadData.category,
          courseId: threadData.course_id,
          createdAt: threadData.created_at,
          updatedAt: threadData.updated_at,
          createdBy: {
            id: threadData.created_by,
            name: threadData.profiles?.full_name || "Anonymous",
            avatar: threadData.profiles?.avatar_url,
          },
          participantCount: 0, // Will be calculated later
          replyCount: 0, // Will be calculated later
          isPinned: threadData.is_pinned,
          isLocked: threadData.is_locked,
        };

        // Fetch messages for this thread
        const { data: messagesData, error: messagesError } = await supabase
          .from('discussion_messages')
          .select(`
            id,
            thread_id,
            content,
            created_at,
            updated_at,
            user_id,
            parent_id,
            likes,
            is_edited,
            profiles:user_id (full_name, avatar_url)
          `)
          .eq('thread_id', threadId)
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;

        // Format messages data
        const formattedMessages: Message[] = messagesData.map(msg => ({
          id: msg.id,
          threadId: msg.thread_id,
          content: msg.content,
          createdAt: msg.created_at,
          updatedAt: msg.updated_at,
          userId: msg.user_id,
          userName: msg.profiles?.full_name || "Anonymous",
          userAvatar: msg.profiles?.avatar_url,
          parentId: msg.parent_id,
          likes: msg.likes,
          isEdited: msg.is_edited,
        }));

        // Calculate participant count and reply count
        const uniqueUsers = new Set(formattedMessages.map(msg => msg.userId));
        formattedThread.participantCount = uniqueUsers.size;
        formattedThread.replyCount = formattedMessages.length;

        setThread(formattedThread);
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching thread data:", error);
        toast({
          title: "Error loading discussion",
          description: "Failed to load the discussion thread. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreadAndMessages();

    // Set up realtime subscription for new messages
    const messagesChannel = supabase
      .channel('discussion_messages_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'discussion_messages', filter: `thread_id=eq.${threadId}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Add new message
            const newMessage = payload.new as any;
            // Fetch user profile info for the new message
            supabase
              .from('profiles')
              .select('full_name, avatar_url')
              .eq('id', newMessage.user_id)
              .single()
              .then(({ data: profile }) => {
                const formattedMessage: Message = {
                  id: newMessage.id,
                  threadId: newMessage.thread_id,
                  content: newMessage.content,
                  createdAt: newMessage.created_at,
                  updatedAt: newMessage.updated_at,
                  userId: newMessage.user_id,
                  userName: profile?.full_name || "Anonymous",
                  userAvatar: profile?.avatar_url,
                  parentId: newMessage.parent_id,
                  likes: newMessage.likes,
                  isEdited: newMessage.is_edited,
                };
                setMessages(prev => [...prev, formattedMessage]);
              });
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted message
            setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            // Update modified message
            const updatedMessage = payload.new as any;
            setMessages(prev => 
              prev.map(msg => 
                msg.id === updatedMessage.id ? 
                  { ...msg, 
                    content: updatedMessage.content, 
                    updatedAt: updatedMessage.updated_at, 
                    likes: updatedMessage.likes,
                    isEdited: updatedMessage.is_edited 
                  } : msg
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [threadId, navigate, toast]);

  const handleBack = () => {
    navigate("/discussion");
  };

  const handleSendMessage = async (content: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to participate in discussions.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (thread?.isLocked) {
      toast({
        title: "Thread locked",
        description: "This thread is locked and cannot receive new replies.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('discussion_messages')
        .insert({
          thread_id: threadId,
          content,
          user_id: user.id,
          parent_id: replyTo?.id
        })
        .select()
        .single();

      if (error) throw error;

      // The message will be added via the realtime subscription
      setReplyTo(null);
      
      toast({
        title: "Message sent",
        description: "Your message has been posted successfully.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    // The UI update will be handled by the realtime subscription
    // We've already implemented the delete functionality in MessageItem component
  };

  const handleLikeMessage = async (messageId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to like messages.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get current message
      const messageToUpdate = messages.find(msg => msg.id === messageId);
      if (!messageToUpdate) return;

      // Update message in database
      const { error } = await supabase
        .from('discussion_messages')
        .update({ likes: messageToUpdate.likes + 1 })
        .eq('id', messageId);

      if (error) throw error;

      // The update will be handled by the realtime subscription
    } catch (error) {
      console.error("Error liking message:", error);
      toast({
        title: "Error",
        description: "Failed to like the message. Please try again.",
        variant: "destructive",
      });
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">Loading discussion...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[400px]">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Thread not found</p>
            <Button className="mt-4" onClick={handleBack}>Back to Discussions</Button>
          </div>
        </main>
      </div>
    );
  }

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
                {rootMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground">No messages yet. Be the first to contribute!</p>
                  </div>
                ) : (
                  rootMessages.map((message) => (
                    <MessageItem
                      key={message.id}
                      message={message}
                      currentUserId={user?.id}
                      onDelete={handleDeleteMessage}
                      onLike={handleLikeMessage}
                      onReply={handleReply}
                      replies={getMessageReplies(message.id)}
                    />
                  ))
                )}
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
