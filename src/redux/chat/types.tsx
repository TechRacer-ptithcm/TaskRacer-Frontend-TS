export interface Contact {
  id: string;
  name: string;
  status: string;
  avatar?: string;
  isActive?: boolean;
  username?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}
