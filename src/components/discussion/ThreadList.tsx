
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Thread } from "@/types/discussion";
import ThreadCard from "./ThreadCard";
import { Button } from "@/components/ui/button";
import { Pin, Lock } from "lucide-react";

// Mock data - would be replaced with API calls
const mockThreads: Thread[] = [
  {
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
  },
  {
    id: "2",
    title: "Understanding Python decorators - a comprehensive guide",
    category: "Python",
    createdAt: "2023-10-14T09:15:00Z",
    updatedAt: "2023-10-15T11:40:00Z",
    createdBy: {
      id: "user2",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    },
    participantCount: 5,
    replyCount: 9,
    isPinned: false,
    isLocked: false
  },
  {
    id: "3",
    title: "Algorithms for beginners: Sorting algorithms explained",
    category: "Algorithms",
    createdAt: "2023-10-13T15:45:00Z",
    updatedAt: "2023-10-14T08:30:00Z",
    createdBy: {
      id: "user3",
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    participantCount: 12,
    replyCount: 23,
    isPinned: false,
    isLocked: true
  },
  {
    id: "4",
    title: "JavaScript async/await vs Promises - what to use when?",
    category: "JavaScript",
    createdAt: "2023-10-12T11:20:00Z",
    updatedAt: "2023-10-13T16:10:00Z",
    createdBy: {
      id: "user4",
      name: "Sam Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
    },
    participantCount: 10,
    replyCount: 18,
    isPinned: false,
    isLocked: false
  },
];

interface ThreadListProps {
  searchQuery: string;
  selectedCategories: string[];
}

const ThreadList = ({ searchQuery, selectedCategories }: ThreadListProps) => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');

  useEffect(() => {
    // Filter threads based on search query and selected categories
    let filteredThreads = [...mockThreads];
    
    if (searchQuery) {
      filteredThreads = filteredThreads.filter(thread => 
        thread.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategories.length > 0) {
      filteredThreads = filteredThreads.filter(thread => 
        selectedCategories.includes(thread.category)
      );
    }
    
    // Sort threads
    filteredThreads.sort((a, b) => {
      // Pinned threads always go first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Then sort by the selected sort option
      if (sortBy === 'latest') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        return b.replyCount - a.replyCount;
      }
    });
    
    setThreads(filteredThreads);
  }, [searchQuery, selectedCategories, sortBy]);

  const handleThreadClick = (threadId: string) => {
    navigate(`/discussion/${threadId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Threads {threads.length > 0 && `(${threads.length})`}
        </h2>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'latest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('latest')}
          >
            Latest
          </Button>
          <Button
            variant={sortBy === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('popular')}
          >
            Popular
          </Button>
        </div>
      </div>

      {threads.length === 0 ? (
        <div className="text-center py-12 bg-muted/40 rounded-lg">
          <p className="text-muted-foreground">No threads found matching your criteria</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            navigate('/discussion/new');
          }}>
            Create a new thread
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard 
              key={thread.id} 
              thread={thread} 
              onClick={() => handleThreadClick(thread.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadList;
