import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Download, Trash2, VolumeX } from "lucide-react";

export const ChatItem = ({ chat, idx, selected, onClick, onMenuClick }) => {
  return (
    <div
      key={chat.id}
      onClick={() => onClick && onClick(idx)}
      className={`flex cursor-pointer items-center justify-between rounded-lg p-3 mb-2 ${
        selected ? "ring-2 ring-pink-200" : "hover:bg-gray-50"
      }`}
    >
      {/* Left: avatar + name/phone */}
      <div className="max-w-full overflow-hidden flex items-center gap-3">
        <div className="relative">
          <Avatar>
            {chat.avatar ? (
              <AvatarImage src={chat.avatar} alt={chat.name} />
            ) : (
              <AvatarFallback>{chat.name?.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          {/* status dot bottom-left */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
              chat.online ? "bg-green-500" : "bg-gray-300"
            }`}
            aria-hidden
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate">{chat.name}</p>
          <p className="text-xs text-gray-500 truncate">
            {chat.phone || chat.subtitle || chat.lastMessage}
          </p>
        </div>
      </div>

      {/* Right: ID/time and actions */}
      <div className="flex items-center gap-3 text-right">
        <div className="mr-2">
          <div className="text-xs text-gray-400">
            ID:{" "}
            <span className="text-gray-600">{chat.refId || `#${chat.id}`}</span>
          </div>
          <div className="text-sm font-medium text-gray-700">{chat.time}</div>
        </div>

        {/* play icon (triangle) */}
        {/* unread message badge */}
        {chat.unread ? (
          <div className="size-7 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 text-sm hover:bg-pink-100">
            {chat.unread}
          </div>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}

        {/* kebab menu (three dots) with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              aria-label="more options"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-[160px] p-1">
            <DropdownMenuItem
              onSelect={() => {
                onMenuClick && onMenuClick(chat, "unarchive");
                chat.onUnarchive && chat.onUnarchive(chat);
              }}
              className="text-green-600"
            >
              <Download className="size-4 text-green-600" />
              <span>Archive</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => {
                onMenuClick && onMenuClick(chat, "delete");
                chat.onDelete && chat.onDelete(chat);
              }}
              className="text-destructive"
            >
              <Trash2 className="size-4 text-destructive" />
              <span>Delete Chat</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => {
                onMenuClick && onMenuClick(chat, "mute");
                chat.onMute && chat.onMute(chat);
              }}
            >
              <VolumeX className="size-4 text-primary" />
              <span className="text-primary">Mute</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
