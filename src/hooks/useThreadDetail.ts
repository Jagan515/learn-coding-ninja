
import { useState, useEffect } from "react";
import { Message } from "@/types/discussion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ThreadDetail {
  title: string;
  category: string;
  createdAt: Date | null;
  authorName: string;
  authorAvatar: string | null;
  isPinned: boolean;
  isLocked: boolean;
  messages: Message[];
  rootMessages: Message[];
}

export const useThreadDetail = (threadId: string | undefined, userId: string | null) => {
  const { toast } = useToast();
  const [threadDetail, setThreadDetail] = useState<ThreadDetail>({
    title: "",
    category: "",
    createdAt: null,
    authorName: "",
    authorAvatar: null,
    isPinned: false,
    isLocked: false,
    messages: [],
    rootMessages: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  // Fetch thread data
  useEffect(() => {
    const fetchThread = async () => {
      setIsLoading(true);
      try {
        if (!threadId) return;
        
        // First, fetch the thread details
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
            is_locked
          `)
          .eq('id', threadId)
          .single();
          
        if (threadError) {
          throw threadError;
        }
        
        let authorName = "Unknown User";
        let authorAvatar = null;
        
        if (threadData) {
          // Separately fetch the author profile data
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('id', threadData.created_by)
            .single();
            
          if (!profileError && profileData) {
            authorName = profileData.username || "Unknown User";
            authorAvatar = profileData.avatar_url;
          }
        }
        
        // Then fetch the messages
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
            is_edited
          `)
          .eq('thread_id', threadId)
          .order('created_at', { ascending: true });
          
        if (messagesError) {
          throw messagesError;
        }
        
        let formattedMessages: Message[] = [];
        
        if (messagesData) {
          // Process the messages and fetch user profiles separately
          const messagePromises = messagesData.map(async (msg) => {
            // Fetch profile data for each message
            const { data: profileData } = await supabase
              .from('profiles')
              .select('username, avatar_url')
              .eq('id', msg.user_id)
              .single();
            
            return {
              id: msg.id,
              threadId: msg.thread_id,
              content: msg.content,
              createdAt: new Date(msg.created_at),
              updatedAt: new Date(msg.updated_at),
              userId: msg.user_id,
              userName: profileData?.username || "Unknown User",
              userAvatar: profileData?.avatar_url || null,
              parentId: msg.parent_id || null,
              likes: msg.likes,
              isEdited: msg.is_edited
            };
          });
          
          formattedMessages = await Promise.all(messagePromises);
        }
        
        // Update state with all the data
        setThreadDetail({
          title: threadData.title,
          category: threadData.category,
          createdAt: threadData.created_at ? new Date(threadData.created_at) : null,
          authorName,
          authorAvatar,
          isPinned: threadData.is_pinned || false,
          isLocked: threadData.is_locked || false,
          messages: formattedMessages,
          rootMessages: formattedMessages.filter(msg => !msg.parentId)
        });
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
          parent_id,
          likes,
          is_edited
        `)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        // Fetch the profile data for the current user
        const { data: profileData } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', userId)
          .single();
        
        const formattedMessage: Message = {
          id: data.id,
          threadId: data.thread_id,
          content: data.content,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
          userId: data.user_id,
          userName: profileData?.username || "Unknown User",
          userAvatar: profileData?.avatar_url || null,
          parentId: data.parent_id,
          likes: data.likes,
          isEdited: data.is_edited
        };
        
        setThreadDetail(prev => ({
          ...prev,
          messages: [...prev.messages, formattedMessage],
          rootMessages: !formattedMessage.parentId 
            ? [...prev.rootMessages, formattedMessage] 
            : prev.rootMessages
        }));
        
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
      const updatedMessages = threadDetail.messages.filter(msg => msg.id !== messageId);
      const updatedRootMessages = threadDetail.rootMessages.filter(msg => msg.id !== messageId);
      
      setThreadDetail(prev => ({
        ...prev,
        messages: updatedMessages,
        rootMessages: updatedRootMessages
      }));
      
      // Remove any child messages
      const childMessages = threadDetail.messages.filter(msg => msg.parentId === messageId);
      if (childMessages.length > 0) {
        const childIds = childMessages.map(msg => msg.id);
        setThreadDetail(prev => ({
          ...prev,
          messages: prev.messages.filter(msg => !childIds.includes(msg.id))
        }));
      }
    } catch (error) {
      console.error('Error handling message deletion:', error);
    }
  };
  
  const handleLikeMessage = async (messageId: string) => {
    try {
      const messageToUpdate = threadDetail.messages.find(msg => msg.id === messageId);
      if (!messageToUpdate) return;
      
      const updatedMessages = threadDetail.messages.map(msg => 
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      );
      
      setThreadDetail(prev => ({
        ...prev,
        messages: updatedMessages,
        rootMessages: updatedMessages.filter(msg => !msg.parentId)
      }));
      
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
      
      // Revert to original state
      setThreadDetail(prev => ({
        ...prev,
        messages: [...prev.messages],
        rootMessages: prev.messages.filter(msg => !msg.parentId)
      }));
    }
  };

  return {
    threadDetail,
    isLoading,
    replyingTo,
    setReplyingTo,
    handleSendMessage,
    handleDeleteMessage,
    handleLikeMessage
  };
};
