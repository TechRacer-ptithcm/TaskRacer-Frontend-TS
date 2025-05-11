"use client";

import { useState } from "react";
import Sidebar from "@/features/chat/component/sidebar";
import ChatArea from "@/features/chat/component/chat-area";
import ProfileSidebar from "@/features/chat/component/profile-sidebar";
import type { Contact, Message } from "@/redux/chat/types";

export default function Chat() {
  // Danh sách liên hệ với thông tin đầy đủ
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Super DOMDOM",
      status: "online",
      username: "superdom",
    },
    {
      id: "2",
      name: "Light Ass97",
      status: "online",
      username: "lightass.97",
    },
    {
      id: "3",
      name: "Roberd Bocon",
      status: "45 mins ago",
      username: "roberd.b",
    },
    {
      id: "4",
      name: "Alexander J97",
      status: "23 mins ago",
      username: "alex.j97",
    },
    {
      id: "5",
      name: "Light Ass97",
      status: "online",
      username: "lightass.97",
    },
    {
      id: "6",
      name: "Roberd Bocon",
      status: "45 mins ago",
      username: "roberd.b",
    },
    {
      id: "7",
      name: "John Fivechiu",
      status: "online",
      username: "john.five",
    },
    {
      id: "8",
      name: "John Fivechiu",
      status: "online",
      username: "john.five",
    },
    {
      id: "9",
      name: "John Fivechiu",
      status: "online",
      username: "john.five",
    },
    {
      id: "10",
      name: "John Fivechiu",
      status: "online",
      username: "john.five",
    },
  ]);

  // Tin nhắn theo từng liên hệ
  const [allMessages, setAllMessages] = useState<{ [key: string]: Message[] }>({
    "1": [
      {
        id: "1",
        senderId: "user",
        receiverId: "1",
        text: "Hi Super DOMDOM!",
        timestamp: new Date(),
      },
      {
        id: "2",
        senderId: "1",
        receiverId: "user",
        text: "Hello there! How can I help you?",
        timestamp: new Date(),
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "user",
        receiverId: "2",
        text: "Hey Light, how's it going?",
        timestamp: new Date(),
      },
      {
        id: "2",
        senderId: "2",
        receiverId: "user",
        text: "All good! Working on some projects.",
        timestamp: new Date(),
      },
    ],
    "3": [
      {
        id: "1",
        senderId: "user",
        receiverId: "3",
        text: "Roberd, did you see the latest update?",
        timestamp: new Date(),
      },
      {
        id: "2",
        senderId: "3",
        receiverId: "user",
        text: "Yes, I'm checking it now.",
        timestamp: new Date(),
      },
    ],
    "4": [
      {
        id: "1",
        senderId: "user",
        receiverId: "4",
        text: "Hi there! How are you doing today?",
        timestamp: new Date(),
      },
      {
        id: "2",
        senderId: "4",
        receiverId: "user",
        text: "I'm doing great, thanks for asking!",
        timestamp: new Date(),
      },
      {
        id: "3",
        senderId: "4",
        receiverId: "user",
        text: "How about you?",
        timestamp: new Date(),
      },
      {
        id: "4",
        senderId: "user",
        receiverId: "4",
        text: "I'm doing well too! Just working on some projects.",
        timestamp: new Date(),
      },
    ],
  });

  // State để theo dõi liên hệ đang được chọn
  const [selectedContactId, setSelectedContactId] = useState<string>("4");

  // Lấy thông tin liên hệ đang được chọn
  const selectedContact =
    contacts.find((contact) => contact.id === selectedContactId) || contacts[0];

  // Lấy tin nhắn của liên hệ đang được chọn
  const currentMessages = allMessages[selectedContactId] || [];

  // Xử lý khi người dùng nhấp vào một liên hệ
  const handleContactClick = (contactId: string) => {
    setSelectedContactId(contactId);

    // Cập nhật danh sách liên hệ để đánh dấu liên hệ đang được chọn
    setContacts(
      contacts.map((contact) => ({
        ...contact,
        isActive: contact.id === contactId,
      })),
    );
  };

  // Xử lý khi gửi tin nhắn
  const handleSendMessage = (message: string) => {
    if (message.trim() && selectedContactId) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: "user",
        receiverId: selectedContactId,
        text: message,
        timestamp: new Date(),
      };

      // Cập nhật tin nhắn cho liên hệ đang được chọn
      setAllMessages((prev) => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
      }));
    }
  };

  return (
    <main className="mx-auto flex grid h-[90vh] grid-cols-1 gap-6 font-['Baloo_2',sans-serif] text-xl lg:grid-cols-4">
      <div className="col-span-3 mr-1 mb-10 flex flex-1">
        {/*chat */}
        <div className="relative h-[90vh] w-full rounded-[50px] bg-[#F4F6FE] p-5 shadow-[20px_20px_40px_0px_rgba(0,_0,_0,_0.1)]">
          <div className="flex grid h-full grid-cols-1 flex-col gap-2 lg:grid-cols-3">
            {/*đoạn chat*/}
            <div className="col-span-1 mr-3 flex flex-1 overflow-x-hidden overflow-y-auto">
              <Sidebar
                contacts={contacts}
                selectedContactId={selectedContactId}
                onContactClick={handleContactClick}
              />
            </div>

            {/* nhắn tin */}
            <div className="col-span-2 mr-3 flex flex-1">
              <ChatArea
                selectedContact={selectedContact}
                messages={currentMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>

      {/*data*/}
      <div className="col-span-1 mr-3 mb-10 flex flex-1">
        <ProfileSidebar selectedContact={selectedContact} />
      </div>
    </main>
  );
}
