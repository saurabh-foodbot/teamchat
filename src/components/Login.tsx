import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { MessageSquare } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const email = decoded.email as string;
    
    if (!email.endsWith('@foodbot.ai')) {
      alert('Only @foodbot.ai email addresses are allowed');
      return;
    }
    
    onLogin(decoded);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <MessageSquare size={48} className="text-blue-500" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Welcome to TeamChat
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in with your @foodbot.ai Google account
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Only @foodbot.ai email addresses are allowed to access this application
          </p>
        </div>
      </div>
    </div>
  );
}