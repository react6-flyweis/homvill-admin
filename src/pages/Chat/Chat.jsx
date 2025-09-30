import React, { useState, useEffect, useRef } from "react";
import ChatTopBar from "@/components/Chat/ChatTopBar";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatConversation from "@/components/Chat/ChatConversation";
import ChatInput from "@/components/Chat/ChatInput";
import NewChatDialog from "@/components/Chat/NewChatDialog";
import { firebaseEnabled } from "@/lib/firebase";
import {
  createUser,
  subscribeToConversationsForUser,
  subscribeToConversation,
  sendMessage as sendMessageToFirestore,
  createConversation,
} from "@/lib/chatService";
import { getUsers } from "@/lib/chatService";
import { useAuthStore } from "@/store/authStore";

const ChatUI = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  // start with empty chat list; real data will be loaded from Firestore when enabled
  const [chats, setChats] = useState([]);

  // simple random avatar generator using the https://i.pravatar.cc service
  function getRandomAvatar(seed) {
    // pravatar supports size and a seed (number or string) to get consistent images
    const size = 300;
    const s = seed || Math.floor(Math.random() * 1000 + Date.now());
    return `https://i.pravatar.cc/${size}?u=${s}`;
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState({});
  const convUnsubRef = useRef(null);
  const messagesUnsubRef = useRef(null);
  // get auth user from the global store
  const authUser = useAuthStore((s) => s.user);

  // load conversations from Firestore when enabled
  useEffect(() => {
    if (!firebaseEnabled) return;

    const currentUserId = authUser.user_id;

    createUser({
      id: currentUserId,
      name: authUser?.Name || "You",
      avatar: authUser?.avatar || "https://i.pravatar.cc/300",
    }).catch(console.error);

    // subscribe to conversation list; only load minimal metadata here
    convUnsubRef.current = subscribeToConversationsForUser(
      currentUserId,
      (convs) => {
        const mapped = convs.map((c) => ({
          id: c.id,
          participants: c.participants || [],
          meta: c.meta || {},
          name: (c.meta && c.meta.name) || `Conversation ${c.id}`,
          avatar: (c.meta && c.meta.avatar) || "https://i.pravatar.cc/300",
          // compute other participant name/avatar
          otherName: (() => {
            const me = authUser.user_id;
            const other = (c.participants || []).find(
              (p) => String(p) !== String(me)
            );
            const u = other ? users[String(other)] : null;
            return u?.Name || u?.name || null;
          })(),
          otherAvatar: (() => {
            const me = authUser.user_id;
            const other = (c.participants || []).find(
              (p) => String(p) !== String(me)
            );
            const u = other ? users[String(other)] : null;
            return u?.avatar || (c.meta && c.meta.avatar) || null;
          })(),
          lastMessage: c.lastMessage || "",
          time: c.updatedAt
            ? c.updatedAt.seconds
              ? new Date(c.updatedAt.seconds * 1000).toLocaleTimeString()
              : String(c.updatedAt)
            : "",
          messages: [],
        }));
        setChats(mapped);
        // keep selectedChat within range
        setSelectedChat((prev) => {
          if (mapped.length === 0) return 0;
          return Math.min(prev, mapped.length - 1);
        });
      }
    );

    return () => {
      if (convUnsubRef.current) convUnsubRef.current();
      if (messagesUnsubRef.current) messagesUnsubRef.current();
    };
  }, [firebaseEnabled, authUser]);

  // fetch users map (for resolving participant names)
  useEffect(() => {
    if (!firebaseEnabled) return;
    getUsers()
      .then((list) => {
        const map = {};
        list.forEach((u) => {
          map[String(u.id)] = u;
        });
        setUsers(map);
      })
      .catch(console.error);
  }, [firebaseEnabled]);

  // helper to get the other participant's display name for a conversation
  const getOtherName = (conv) => {
    if (!conv) return "";
    // prefer explicit conversation meta name
    if (conv.meta && conv.meta.name) return conv.meta.name;
    const me = authUser.user_id;
    const parts = conv.participants || [];
    const other = parts.find((p) => String(p) !== String(me));
    if (!other) return conv.name || "";
    const user = users[String(other)];
    return user?.Name || user?.name || conv.name || String(other);
  };

  // subscribe to messages for the selected conversation
  useEffect(() => {
    if (!firebaseEnabled) return;
    if (!chats || chats.length === 0) return;

    const conv = chats[selectedChat];
    if (!conv || !conv.id) return;

    // unsubscribe previous
    if (messagesUnsubRef.current) messagesUnsubRef.current();

    messagesUnsubRef.current = subscribeToConversation(
      String(conv.id),
      (msgs) => {
        // map messages into UI shape
        setChats((prev) => {
          const copy = JSON.parse(JSON.stringify(prev));
          const idx = copy.findIndex((c) => String(c.id) === String(conv.id));
          if (idx === -1) return prev;
          copy[idx].messages = msgs.map((m) => ({
            id: m.id,
            text: m.text,
            sender:
              m.sender ===
              (typeof conv.currentUserId !== "undefined"
                ? conv.currentUserId
                : "local_user_1")
                ? "me"
                : "other",
            time: m.createdAt
              ? m.createdAt.seconds
                ? new Date(m.createdAt.seconds * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : String(m.createdAt)
              : "",
          }));
          // keep lastMessage/time in conversation meta
          if (msgs.length > 0) {
            const last = msgs[msgs.length - 1];
            copy[idx].lastMessage = last.text || copy[idx].lastMessage;
          }
          return copy;
        });
      }
    );

    return () => {
      if (messagesUnsubRef.current) messagesUnsubRef.current();
      messagesUnsubRef.current = null;
    };
  }, [selectedChat, chats]);

  const filteredChats = chats.filter((c) =>
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // current selected conversation (safe guard)
  const currentChat =
    chats && chats.length > 0 && chats[selectedChat]
      ? chats[selectedChat]
      : null;

  const sendMessage = () => {
    if (message.trim() === "") return;
    if (firebaseEnabled) {
      // assume conversations use string ids and we have a selected chat
      const currentConv = chats[selectedChat];
      if (!currentConv) return;
      const payload = {
        text: message,
        sender: authUser && authUser.id ? String(authUser.id) : "local_user_1",
        // optionally include displayName, avatar
      };
      sendMessageToFirestore(String(currentConv.id), payload).catch(
        console.error
      );
      setMessage("");
      return;
    }

    // fallback local behavior
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
    if (firebaseEnabled) {
      // create conversation in Firestore and optionally a user record for contact
      const convMeta = {
        name,
        avatar: getRandomAvatar(name || contact || Date.now()),
      };
      const creator =
        authUser && authUser.id ? String(authUser.id) : "local_user_1";
      createConversation([creator, String(contact || Date.now())], convMeta)
        .then(() => setIsDialogOpen(false))
        .catch(console.error);
      return;
    }

    // fallback local behavior
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
          selectedIndex={
            currentChat
              ? filteredChats.findIndex((c) => c.id === currentChat.id)
              : -1
          }
          onSelect={handleSelect}
          onSearch={setSearch}
          onNewChat={() => setIsDialogOpen(true)}
        />

        {/* Right Chat Panel */}
        <div className="flex flex-1 border rounded-md border-primary/50 overflow-hidden flex-col">
          <div className="border-b bg-white p-2 px-4">
            <ChatTopBar
              title={
                currentChat
                  ? currentChat.otherName || getOtherName(currentChat)
                  : "No conversation selected"
              }
              description={currentChat ? `ID: #${currentChat.id}` : ""}
              avatar={currentChat?.otherAvatar}
            />
          </div>

          <ChatConversation
            messages={currentChat ? currentChat.messages : []}
            otherName={
              currentChat ? currentChat.otherName || currentChat.name : ""
            }
            otherAvatar={
              currentChat
                ? currentChat.otherAvatar || currentChat.avatar
                : "https://i.pravatar.cc/300"
            }
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
