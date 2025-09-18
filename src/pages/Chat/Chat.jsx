import React, { useState } from "react";
import ChatTopBar from "@/components/Chat/ChatTopBar";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatConversation from "@/components/Chat/ChatConversation";
import ChatInput from "@/components/Chat/ChatInput";
import NewChatDialog from "@/components/Chat/NewChatDialog";

const ChatUI = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Ujaya Devei",
      avatar: getRandomAvatar(),
      lastMessage: "Lorem Ipsum is simply...",
      time: "08:00",
      messages: [
        {
          id: 1,
          text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          sender: "other",
          time: "8:00 PM",
        },
        {
          id: 2,
          text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          sender: "me",
          time: "8:00 PM",
        },
      ],
    },
    {
      id: 2,
      name: "Cheyenne Baptista",
      avatar: getRandomAvatar(),
      lastMessage: "Hey, how are you?",
      time: "02:13",
      messages: [],
    },
  ]);

  // simple random avatar generator using the https://i.pravatar.cc service
  function getRandomAvatar(seed) {
    // pravatar supports size and a seed (number or string) to get consistent images
    const size = 300;
    const s = seed || Math.floor(Math.random() * 1000 + Date.now());
    return `https://i.pravatar.cc/${size}?u=${s}`;
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (message.trim() === "") return;
    setChats((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const chat = copy[selectedChat];
      const newMsg = {
        id: Date.now(),
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      chat.messages.push(newMsg);
      chat.lastMessage = message;
      return copy;
    });
    setMessage("");
  };

  const handleSelect = (index) => {
    // map filtered index back to original index
    const chatId = filteredChats[index].id;
    const originalIndex = chats.findIndex((c) => c.id === chatId);
    if (originalIndex >= 0) setSelectedChat(originalIndex);
  };

  const createNewChat = ({ contact, name }) => {
    // build a new chat object and append to chats
    setChats((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const newChat = {
        id: Date.now(),
        name,
        contact,
        avatar: getRandomAvatar(name || contact || Date.now()),
        lastMessage: "",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        messages: [],
      };
      copy.unshift(newChat);
      return copy;
    });

    // select the newly added chat (it will be at index 0)
    setSelectedChat(0);
    setIsDialogOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div className="">
          <h2 className="text-xl font-semibold mb-1">Chat</h2>
          <p className="text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <select className="border rounded px-2 py-1 text-sm">
          <option>All</option>
          <option>Unread</option>
        </select>
      </div>

      <div className="flex flex-1 gap-5">
        {/* Left Sidebar */}
        <ChatSidebar
          chats={filteredChats}
          selectedIndex={filteredChats.findIndex(
            (c) => c.id === chats[selectedChat].id
          )}
          onSelect={handleSelect}
          onSearch={setSearch}
          onNewChat={() => setIsDialogOpen(true)}
        />

        {/* Right Chat Panel */}
        <div className="flex flex-1 border rounded-md border-primary/50 overflow-hidden flex-col">
          <div className="border-b bg-white p-2 px-4">
            <ChatTopBar
              title={chats[selectedChat].name}
              description={`ID: #${chats[selectedChat].id}`}
            />
          </div>

          <ChatConversation
            messages={chats[selectedChat].messages}
            otherName={chats[selectedChat].name}
            otherAvatar={chats[selectedChat].avatar}
            myName={"You"}
            myAvatar="https://i.pravatar.cc/300"
          />

          <ChatInput
            value={message}
            onChange={setMessage}
            onSend={sendMessage}
          />
        </div>
        <NewChatDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onCreate={createNewChat}
        />
      </div>
    </div>
  );
};

export default ChatUI;
