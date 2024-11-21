export interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

export interface Channel {
  id: string;
  name: string;
}

export interface DirectMessage {
  id: string;
  name: string;
  online: boolean;
}

export interface User {
  email: string;
  name: string;
  picture: string;
}