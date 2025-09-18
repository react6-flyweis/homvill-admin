import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { ChatItem } from "./ChatItem";
import ArchiveIcon from "@/assets/archive.png";

const ChatSidebar = ({
  chats,
  selectedIndex,
  onSelect,
  onSearch,
  onNewChat,
}) => {
  return (
    <div className="w-1/3 border rounded-md border-primary/60 bg-white p-3 flex flex-col">
      <div className="mb-3">
        <h3 className="font-semibold mb-2">All</h3>

        <div className="flex gap-2 justify-around">
          <div className="relative flex-1">
            <SearchIcon className="size-5 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="search here"
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="pl-8 rounded-md border-primary/50 flex-1"
            />
          </div>
          <Button variant="ghost" size="icon">
            <img src={ArchiveIcon} alt="Archive" className="max-w-6 max-h-6" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onNewChat} asChild={false}>
            <span className="text-primary">CHAT +</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-1">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat, idx) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              idx={idx}
              selected={selectedIndex === idx}
              onClick={onSelect}
              onMenuClick={chat.onMenuClick}
            />
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">No chats</div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
