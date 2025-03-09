
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { Challenge } from "../types/challenge.types";

interface ChallengeHeaderProps {
  challenge: Challenge;
  solved: boolean;
}

const ChallengeHeader = ({ challenge, solved }: ChallengeHeaderProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "hard": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold">{challenge.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Python
          </Badge>
        </div>
      </div>
      {solved && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full border border-green-200">
          <Trophy className="h-4 w-4" />
          <span className="font-medium">Challenge Completed!</span>
        </div>
      )}
    </div>
  );
};

export default ChallengeHeader;
