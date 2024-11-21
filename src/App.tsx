import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Login from './components/Login';
import type { User } from './types';

const GOOGLE_CLIENT_ID = ''; // Add your Google Client ID here

function App() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Login onLogin={(userData) => {
          setUser({
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
          });
        }} />
      </GoogleOAuthProvider>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentUser={user} />
      <ChatArea currentUser={user} />
    </div>
  );
}

export default App;