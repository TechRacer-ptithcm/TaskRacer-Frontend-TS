"use client";

import { useRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import type { Message, Contact } from "@/redux/chat/types";

interface MessageListProps {
  messages: Message[];
  selectedContact: Contact;
}

export default function MessageList({
  messages,
  selectedContact,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="max-h-[90vh] flex-1 space-y-4 overflow-auto py-4 break-words">
      {messages.map((message, index) => {
        const isUser = message.senderId === "user";
        const isLast =
          index === messages.length - 1 ||
          messages[index + 1]?.senderId !== message.senderId;

        return isUser ? (
          <div
            key={message.id}
            className={`flex items-end justify-end ${isLast ? "pr-4" : "pr-[64px]"}`}
          >
            <div className="flex max-w-[70%] flex-row-reverse items-end gap-2">
              {isLast && (
                <Avatar className="h-10 w-10 bg-gray-200 text-gray-500">
                  U
                </Avatar>
              )}
              <div className="max-w-[100%] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-[50px] bg-[#FDBBC1] p-4 whitespace-pre-line text-black shadow-[-12px_12px_10px_0px_rgba(0,0,0,0.1)]">
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            key={message.id}
            className={`flex items-end ${isLast ? "pl-4" : "pl-[64px]"}`}
          >
            <div className="flex max-w-[70%] items-end gap-2">
              {isLast && (
                <Avatar className="h-10 w-10 bg-gray-200 text-gray-500">
                  {selectedContact.name.charAt(0)}
                </Avatar>
              )}
              <div className="max-w-[100%] rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] bg-white p-4 whitespace-pre-line text-black shadow-[12px_12px_10px_0px_rgba(0,0,0,0.1)]">
                <p>{message.text}</p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
