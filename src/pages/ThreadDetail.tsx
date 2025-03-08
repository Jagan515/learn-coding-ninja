import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ThreadHeader from "@/components/discussion/ThreadHeader";
import MessageList from "@/components/discussion/MessageList";
import { useThreadDetail } from "@/hooks/useThreadDetail";

const ThreadDetail = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUserId(data.session.user.id);
      }
    };
    
    getSession();
  }, []);

  const {
    threadDetail,
    isLoading,
    replyingTo,
    setReplyingTo,
    handleSendMessage,
    handleDeleteMessage,
    handleLikeMessage
  } = useThreadDetail(threadId, userId);

  const handleBack = () => {
    navigate('/discussion');
  };
  
  const handleReply = (message: any) => {
    setReplyingTo(message);
  };

  if (isLoading) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-40 bg-muted rounded"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="space-y-2">
            <div className="h-40 bg-muted rounded"></div>
            <div className="h-40 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8 max-w-4xl">
      <ThreadHeader
        title={threadDetail.title}
        category={threadDetail.category}
        createdAt={threadDetail.createdAt}
        authorName={threadDetail.authorName}
        isPinned={threadDetail.isPinned}
        isLocked={threadDetail.isLocked}
        onBack={handleBack}
      />
      
      <Card className="mt-6">
        <CardHeader className="pb-0">
          {/* Header content is now in ThreadHeader component */}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <MessageList
            messages={threadDetail.messages}
            rootMessages={threadDetail.rootMessages}
            currentUserId={userId}
            isLocked={threadDetail.isLocked}
            replyingTo={replyingTo}
            onDelete={handleDeleteMessage}
            onLike={handleLikeMessage}
            onReply={handleReply}
            onCancelReply={() => setReplyingTo(null)}
            onSendMessage={handleSendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreadDetail;
