import React from "react";
import { SendHorizonal, CheckCheck, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatInput = ({ value, onChange, onSend }) => {
  return (
    <div className="border-t bg-white p-3 ">
      <div className="gap-2 py-1 flex items-center border-2 rounded-md border-primary">
        <Input
          placeholder="Type message here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-0 focus:ring-0 outline-0 "
        />
        <Button
          variant="default"
          size="icon"
          onClick={onSend}
          aria-label="send"
        >
          <SendHorizonal size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Paperclip size={18} />
        </Button>
        <Button variant="ghost" size="icon" aria-hidden>
          <CheckCheck size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
