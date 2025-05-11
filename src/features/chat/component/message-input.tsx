"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { IconButton } from "@mui/material";
import sendIcon from "@/assets/icons/features/send-svgrepo-com.svg";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="mt-4 flex items-center gap-2 font-['Baloo_2',sans-serif]"
    >
      <div className="w-full">
        <div className="flex items-center justify-between rounded-[30px] bg-gray-50 px-6 py-4 font-['Baloo_2',sans-serif]">
          <textarea
            placeholder="Soạn tin nhắn..."
            value={inputMessage}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            rows={1}
            className="max-h-42 min-h-[2rem] w-full resize-none overflow-hidden bg-transparent outline-none"
            style={{ height: "auto" }}
            ref={(el) => {
              if (el) {
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }
            }}
          />
          <IconButton
            type="submit"
            className="ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FDBBC1]"
          >
            <img src={sendIcon || "/placeholder.svg"} alt="send" />
          </IconButton>
        </div>
      </div>
    </form>
  );
}
