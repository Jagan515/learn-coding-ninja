
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pin, Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import MessageItem from "@/components/discussion/MessageItem";
import MessageEditor from "@/components/discussion/MessageEditor";
import { Message } from "@/types/discussion";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ThreadDetail = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rootMessages, setRootMessages] = useState<Message[]>([]);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Fetch user session
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
      }
    };
    
    getSession();
  }, []);

  // Load thread data
  useEffect(() => {
    const fetchThread = async () => {
      setIsLoading(true);
      try {
        if (!threadId) return;
        
        // Get thread details
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
            profiles:created_by(username, avatar_url),
            is_pinned,
            is_locked
          `)
          .eq('id', threadId)
          .single();
          
        if (threadError) {
          throw threadError;
        }
        
        if (threadData) {
          setTitle(threadData.title);
          setCategory(threadData.category);
          setCreatedAt(new Date(threadData.created_at));
          setAuthorName(threadData.profiles?.username || "Unknown User");
          setAuthorAvatar(threadData.profiles?.avatar_url);
          setIsPinned(threadData.is_pinned);
          setIsLocked(threadData.is_locked);
        }
        
        // Get messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('discussion_messages')
          .select(`
            id,
            thread_id,
            content,
            created_at,
            updated_at,
            user_id,
            profiles:user_id(username, avatar_url),
            parent_id,
            likes,
            is_edited
          `)
          .eq('thread_id', threadId)
          .order('created_at', { ascending: true });
          
        if (messagesError) {
          throw messagesError;
        }
        
        if (messagesData) {
          const formattedMessages: Message[] = messagesData.map(msg => ({
            id: msg.id,
            threadId: msg.thread_id,
            content: msg.content,
            createdAt: new Date(msg.created_at),
            updatedAt: new Date(msg.updated_at),
            userId: msg.user_id,
            userName: msg.profiles?.username || "Unknown User",
            userAvatar: msg.profiles?.avatar_url || null,
            parentId: msg.parent_id || null,
            likes: msg.likes,
            isEdited: msg.is_edited
          }));
          
          setMessages(formattedMessages);
          setRootMessages(formattedMessages.filter(msg => !msg.parentId));
        }
      } catch (error) {
        console.error('Error fetching thread:', error);
        toast({
          title: "Error loading thread",
          description: "Failed to load thread details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchThread();
  }, [threadId, toast]);
  
  const handleSendMessage = async (content: string) => {
    try {
      if (!userId) {
        toast({
          title: "Authentication required",
          description: "Please sign in to post messages",
          variant: "destructive",
        });
        return;
      }
      
      const newMessage = {
        thread_id: threadId,
        content,
        user_id: userId,
        parent_id: replyingTo ? replyingTo.id : null
      };
      
      const { data, error } = await supabase
        .from('discussion_messages')
        .insert(newMessage)
        .select(`
          id,
          thread_id,
          content,
          created_at,
          updated_at,
          user_id,
          profiles:user_id(username, avatar_url),
          parent_id,
          likes,
          is_edited
        `)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedMessage: Message = {
          id: data.id,
          threadId: data.thread_id,
          content: data.content,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          userId: data.user_id,
          userName: data.profiles?.username || "Unknown User",
          userAvatar: data.profiles?.avatar_url || null,
          parentId: data.parent_id,
          likes: data.likes,
          isEdited: data.is_edited
        };
        
        setMessages(prev => [...prev, formattedMessage]);
        
        if (!formattedMessage.parentId) {
          setRootMessages(prev => [...prev, formattedMessage]);
        }
        
        setReplyingTo(null);
        
        toast({
          title: "Message sent",
          description: "Your message has been posted successfully.",
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteMessage = async (messageId: string) => {
    try {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      setRootMessages(prev => prev.filter(msg => msg.id !== messageId));
      
      // Child messages will also be deleted due to cascade delete in the database
      const childMessages = messages.filter(msg => msg.parentId === messageId);
      if (childMessages.length > 0) {
        setMessages(prev => 
          prev.filter(msg => !childMessages.some(child => child.id === msg.id))
        );
      }
    } catch (error) {
      console.error('Error handling message deletion:', error);
    }
  };
  
  const handleLikeMessage = async (messageId: string) => {
    try {
      // Find the message to update
      const messageToUpdate = messages.find(msg => msg.id === messageId);
      if (!messageToUpdate) return;
      
      // Optimistically update the UI
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      );
      setMessages(updatedMessages);
      setRootMessages(updatedMessages.filter(msg => !msg.parentId));
      
      // Update in the database
      const { error } = await supabase
        .from('discussion_messages')
        .update({ likes: messageToUpdate.likes + 1 })
        .eq('id', messageId);
        
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error liking message:', error);
      toast({
        title: "Error",
        description: "Failed to like message. Please try again.",
        variant: "destructive",
      });
      
      // Revert optimistic update on error
      const originalMessages = [...messages];
      setMessages(originalMessages);
      setRootMessages(originalMessages.filter(msg => !msg.parentId));
    }
  };
  
  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };
  
  const getRepliesForMessage = (messageId: string): Message[] => {
    return messages.filter(msg => msg.parentId === messageId);
  };
  
  return (
    <div className="container py-8 max-w-4xl">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate('/discussion')}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Discussions</span>
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">{category}</Badge>
                {isPinned && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Pin className="h-3 w-3" /> Pinned
                  </Badge>
                )}
                {isLocked && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Locked
                  </Badge>
                )}
                <span>Started by {authorName}</span>
                {createdAt && (
                  <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {rootMessages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                currentUserId={userId || undefined}
                onDelete={handleDeleteMessage}
                onLike={handleLikeMessage}
                onReply={handleReply}
                replies={getRepliesForMessage(message.id)}
              />
            ))}
          </div>
          
          <Separator className="my-6" />
          
          {!isLocked ? (
            <MessageEditor
              onSend={handleSendMessage}
              isAuthenticated={!!userId}
              replyTo={replyingTo}
              onCancelReply={() => setReplyingTo(null)}
            />
          ) : (
            <div className="bg-muted p-4 rounded-md text-center">
              <Lock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">This thread is locked and no longer accepts new replies.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreadDetail;
