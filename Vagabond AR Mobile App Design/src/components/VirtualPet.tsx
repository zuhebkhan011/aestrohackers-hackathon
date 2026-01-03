import React from 'react';
import { Heart } from 'lucide-react';

interface VirtualPetProps {
  mood?: 'happy' | 'neutral' | 'sad';
}

export default function VirtualPet({ mood = 'happy' }: VirtualPetProps) {
  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy':
        return '🐾';
      case 'neutral':
        return '🐾';
      case 'sad':
        return '🐾';
      default:
        return '🐾';
    }
  };

  return (
    <div className="relative cursor-pointer group">
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <span className="text-2xl animate-bounce">{getMoodEmoji()}</span>
      </div>
      
      {/* Health Indicator */}
      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center border-2 border-slate-900">
        <Heart className="w-3 h-3 text-white fill-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute top-full mt-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 backdrop-blur-lg border border-white/10 rounded-lg px-3 py-2 whitespace-nowrap">
        <p className="text-white text-xs">Your travel companion</p>
      </div>
    </div>
  );
}
