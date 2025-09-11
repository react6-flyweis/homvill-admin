import React, { useState } from "react";
import { Send, Check, CheckCheck } from "lucide-react";

const ChatUI = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [chats] = useState([
    {
      id: 1,
      name: "Justin Saris",
      lastMessage: "Lorem Ipsum is simply...",
      time: "03:00",
      messages: [
        {
          id: 1,
          text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          sender: "other",
          time: "5:02 PM",
        },
        {
          id: 2,
          text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          sender: "me",
          time: "5:05 PM",
        },
        {
          id: 3,
          text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          sender: "other",
          time: "6:02 PM",
        },
        {
          id: 4,
          text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          sender: "me",
          time: "6:05 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Cheyenne Baptista",
      lastMessage: "Hey, how are you?",
      time: "02:13",
      messages: [],
    },
  ]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const updatedChats = [...chats];
    updatedChats[selectedChat].messages.push({
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r bg-white p-4 flex flex-col">
        <h1 className="text-xl font-semibold mb-2">Chat</h1>
        <input
          type="text"
          placeholder="Search here"
          className="mb-4 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(index)}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-3 mb-2 ${
                selectedChat === index ? "bg-pink-100" : "hover:bg-gray-100"
              }`}
            >
              <div>
                <p className="font-medium">{chat.name}</p>
                <p className="text-xs text-gray-500">{chat.lastMessage}</p>
              </div>
              <div className="text-xs text-gray-400">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Panel */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b bg-white p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">{chats[selectedChat].name}</p>
            <p className="text-xs text-gray-500">
              ID: #{chats[selectedChat].id}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
          {chats[selectedChat].messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 text-sm shadow ${
                  msg.sender === "me"
                    ? "bg-[#8A1538] text-white rounded-tr-none"
                    : "bg-white text-gray-800 border rounded-tl-none"
                }`}
              >
                {msg.text}
                <div className="mt-1 text-[10px] text-gray-300">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t bg-white p-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type message here..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="rounded-full bg-[#8A1538] p-3 text-white hover:bg-pink-700"
          >
            <Send size={18} />
          </button>
          <button className="rounded-full border p-3 text-gray-500 hover:text-gray-700">
            <CheckCheck size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
