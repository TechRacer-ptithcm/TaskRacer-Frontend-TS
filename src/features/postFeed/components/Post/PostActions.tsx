import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PostActions() {
  return (
    <div className="p-3">
      <div className="mb-2 flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Send className="h-6 w-6" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bookmark className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}