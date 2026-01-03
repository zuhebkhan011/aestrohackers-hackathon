import React from 'react';
import { Home, Compass, Plus, Users, User } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard' as Screen, icon: Home, label: 'Home' },
    { id: 'social' as Screen, icon: Users, label: 'Social' },
    { id: 'diary' as Screen, icon: Plus, label: 'Add', isCenter: true },
    { id: 'savings' as Screen, icon: Compass, label: 'Fund' },
    { id: 'settings' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto">
      <div className="bg-slate-900/80 backdrop-blur-lg border-t border-white/10 px-6 py-3 rounded-t-3xl">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="relative -mt-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg shadow-orange-500/50 flex items-center justify-center hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-1 py-2 px-3 hover:scale-105 transition-transform"
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                />
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
