import ChatHeader from "@/features/chat/component/chat-header";
import MessageList from "@/features/chat/component/message-list";
import MessageInput from "@/features/chat/component/message-input";
import type { Contact, Message } from "@/redux/chat/types";

interface ChatAreaProps {
  selectedContact: Contact;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function ChatArea({
  selectedContact,
  messages,
  onSendMessage,
}: ChatAreaProps) {
  return (
    <div className="relative flex h-[85vh] w-full shrink-0 flex-col rounded-[50px] bg-[#F4F6FE]">
      <ChatHeader selectedContact={selectedContact} />
      <MessageList messages={messages} selectedContact={selectedContact} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}
