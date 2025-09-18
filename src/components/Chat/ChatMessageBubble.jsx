import React from "react";

// Helper: render initials fallback
const initialsFromName = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const Avatar = ({ src, name, size = 8 }) => {
  const sizeClass = `w-${size} h-${size}`; // tailwind numeric sizes (approx)
  return src ? (
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover ${sizeClass}`}
    />
  ) : (
    <div
      className={`rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-sm ${sizeClass}`}
      aria-hidden
    >
      {initialsFromName(name)}
    </div>
  );
};

export const ChatMessageBubble = ({ msg, name = "", avatar = null }) => {
  const isMe = msg.sender === "me";
  return (
    <div
      className={`flex items-center ${isMe ? "justify-end" : "justify-start"}`}
    >
      {!isMe && (
        <div className="mr-3">
          <Avatar src={avatar} name={name} size={10} />
        </div>
      )}

      <div className="">
        <div
          className={`max-w-xs text-xs rounded-lg px-4 py-2  shadow ${
            isMe
              ? "bg-primary text-white rounded-tr-none"
              : "bg-white border-primary text-gray-800 border rounded-tl-none"
          }`}
        >
          {msg.text}
        </div>
        <div className="mt-1 text-[10px] text-gray-300">{msg.time}</div>
      </div>

      {isMe && (
        <div className="ml-3">
          <Avatar src={avatar} name={name} size={10} />
        </div>
      )}
    </div>
  );
};
