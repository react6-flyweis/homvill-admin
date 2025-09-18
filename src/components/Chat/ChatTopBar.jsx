import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ChatTopBar = ({ title, description, rightNode, avatar }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          {avatar ? (
            <AvatarImage src={avatar} alt={title} />
          ) : (
            <AvatarFallback>{title?.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="font-semibold">{title}</h2>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {rightNode}
        <Button variant="ghost" size="sm">
          More
        </Button>
      </div>
    </div>
  );
};

export default ChatTopBar;
