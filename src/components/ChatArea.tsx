import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Send, PlusCircle, Smile } from 'lucide-react';
import type { Message, User } from '../types';

interface ChatAreaProps {
  currentUser: User;
}

const initialMessages: Message[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Parker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    content: 'Hey team! Just finished the new design mockups. Would love your feedback! 🎨',
    timestamp: new Date('2024-03-10T09:30:00'),
  },
  {
    id: '2',
    user: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    content: 'Looking great! The color scheme really pops. Can we discuss the navigation flow in our next meeting?',
    timestamp: new Date('2024-03-10T09:32:00'),
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    content: 'Agreed! The user experience feels much more intuitive now.',
    timestamp: new Date('2024-03-10T09:35:00'),
  },
];

export default function ChatArea({ currentUser }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: {
        name: currentUser.name,
        avatar: currentUser.picture,
      },
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">#design</h2>
          <span className="ml-2 text-gray-500 text-sm">3 members</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div key={message.id} className="flex items-start space-x-3">
            <img
              src={message.user.avatar}
              alt={message.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-baseline">
                <span className="font-medium">{message.user.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {format(new Date(message.timestamp), 'h:mm a')}
                </span>
              </div>
              <p className="text-gray-800 mt-1">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button 
            type="button"
            className="text-gray-500 hover:text-gray-700"
            title="Add attachment"
          >
            <PlusCircle size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message #design"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button 
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
          </div>
          <button 
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-2 transition-colors duration-200"
            disabled={!newMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}