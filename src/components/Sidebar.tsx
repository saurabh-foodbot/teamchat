import React, { useState } from 'react';
import { Hash, Users, Settings, Plus, ChevronDown, LogOut } from 'lucide-react';
import type { Channel, DirectMessage, User } from '../types';

interface SidebarProps {
  currentUser: User;
}

const initialChannels: Channel[] = [
  { id: '1', name: 'general' },
  { id: '2', name: 'engineering' },
  { id: '3', name: 'design' },
  { id: '4', name: 'marketing' },
];

const initialDirectMessages: DirectMessage[] = [
  { id: '1', name: 'Sarah Parker', online: true },
  { id: '2', name: 'John Smith', online: false },
  { id: '3', name: 'Mike Johnson', online: true },
];

export default function Sidebar({ currentUser }: SidebarProps) {
  const [channels] = useState<Channel[]>(initialChannels);
  const [directMessages] = useState<DirectMessage[]>(initialDirectMessages);
  const [activeChannel, setActiveChannel] = useState('3'); // design channel

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-white font-bold text-xl">TeamChat</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between text-gray-300 mb-2">
            <div className="flex items-center">
              <ChevronDown size={18} />
              <span className="ml-1 text-sm font-medium">Channels</span>
            </div>
            <Plus size={18} className="cursor-pointer hover:text-white transition-colors duration-200" />
          </div>
          
          {channels.map(channel => (
            <div
              key={channel.id}
              className={`flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1 cursor-pointer transition-colors duration-200 ${
                channel.id === activeChannel ? 'bg-gray-800 text-white' : ''
              }`}
              onClick={() => setActiveChannel(channel.id)}
            >
              <Hash size={18} />
              <span className="ml-2 text-sm">{channel.name}</span>
            </div>
          ))}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-gray-300 mb-2">
            <div className="flex items-center">
              <ChevronDown size={18} />
              <span className="ml-1 text-sm font-medium">Direct Messages</span>
            </div>
            <Plus size={18} className="cursor-pointer hover:text-white transition-colors duration-200" />
          </div>
          
          {directMessages.map(dm => (
            <div
              key={dm.id}
              className="flex items-center text-gray-400 hover:bg-gray-800 rounded px-2 py-1 cursor-pointer transition-colors duration-200"
            >
              <div className="relative">
                <div 
                  className={`w-2 h-2 absolute right-0 bottom-0 rounded-full ${
                    dm.online ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
                <Users size={18} />
              </div>
              <span className="ml-2 text-sm">{dm.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <div className="flex items-center text-gray-400">
          <img
            src={currentUser.picture}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {}}
            className="flex items-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          >
            <Settings size={18} />
            <span className="ml-2 text-sm">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}