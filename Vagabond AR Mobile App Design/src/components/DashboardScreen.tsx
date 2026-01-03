import React from 'react';
import { Flame, Camera, Coins, Sparkles, MapPin } from 'lucide-react';
import VirtualPet from './VirtualPet';

interface DashboardScreenProps {
  dailyStreak: number;
  onAddLog: () => void;
}

export default function DashboardScreen({ dailyStreak, onAddLog }: DashboardScreenProps) {
  return (
    <div className="relative h-full w-full bg-slate-950">
      {/* Camera View Background Simulation */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1759655160559-6613e51e1dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njc0MTE0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="AR Camera View"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Top Bar - Daily Streak */}
      <div className="relative z-10 pt-12 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-full px-5 py-3">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-white">{dailyStreak} Day Streak</span>
          </div>

          <VirtualPet mood="happy" />
        </div>
      </div>

      {/* AR Overlays - Floating Chests & Coins */}
      <div className="relative z-10 h-full pt-20 px-6">
        {/* Floating Chest 1 */}
        <div 
          className="absolute top-1/4 left-8 animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 bg-cyan-500/20 backdrop-blur-lg border-2 border-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform">
              <Sparkles className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </div>
          </div>
        </div>

        {/* Floating Chest 2 */}
        <div 
          className="absolute top-1/3 right-12 animate-bounce"
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        >
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 bg-cyan-500/20 backdrop-blur-lg border-2 border-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50 hover:scale-110 transition-transform">
              <Sparkles className="w-12 h-12 text-cyan-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
              5
            </div>
          </div>
        </div>

        {/* Floating Coins */}
        <div 
          className="absolute top-1/2 left-1/4 animate-pulse"
          style={{ animationDuration: '2s' }}
        >
          <div className="flex items-center gap-2 bg-orange-500/20 backdrop-blur-lg border border-orange-400 rounded-full px-4 py-2">
            <Coins className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300">+50</span>
          </div>
        </div>

        <div 
          className="absolute top-2/3 right-1/4 animate-pulse"
          style={{ animationDuration: '2s', animationDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 bg-orange-500/20 backdrop-blur-lg border border-orange-400 rounded-full px-4 py-2">
            <Coins className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300">+30</span>
          </div>
        </div>

        {/* AR Location Marker */}
        <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-cyan-500/30 backdrop-blur-lg border-2 border-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse">
              <MapPin className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="bg-slate-900/80 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-2">
              <p className="text-white text-sm">Discover nearby</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Capture Button */}
      <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center">
        <button
          onClick={onAddLog}
          className="w-20 h-20 bg-white rounded-full shadow-2xl shadow-white/50 flex items-center justify-center hover:scale-110 transition-transform border-4 border-slate-900"
        >
          <Camera className="w-10 h-10 text-slate-900" />
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-32 left-0 right-0 z-10 flex justify-center px-6">
        <div className="bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3">
          <p className="text-white text-center text-sm">
            Point camera at AR markers to collect rewards
          </p>
        </div>
      </div>
    </div>
  );
}
