import React from "react";
import ChatMessageBubble from "./ChatMessageBubble";

const ChatConversation = ({
  messages,
  otherName = "",
  otherAvatar = null,
  myName = "Me",
  myAvatar = null,
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
      {messages.map((msg) => (
        <ChatMessageBubble
          key={msg.id}
          msg={msg}
          name={msg.sender === "me" ? myName : otherName}
          avatar={msg.sender === "me" ? myAvatar : otherAvatar}
        />
      ))}
    </div>
  );
};

export default ChatConversation;
