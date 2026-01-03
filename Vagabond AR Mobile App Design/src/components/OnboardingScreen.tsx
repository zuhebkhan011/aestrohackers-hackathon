import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface OnboardingScreenProps {
  onStartJourney: () => void;
}

export default function OnboardingScreen({ onStartJourney }: OnboardingScreenProps) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video Simulation with Image Overlay */}
      <div className="absolute inset-0 bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1759655160559-6613e51e1dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njc0MTE0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Travel destination"
          className="w-full h-full object-cover opacity-60 animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8">
        {/* Top Section - Logo & Title */}
        <div className="pt-20">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-cyan-400/30" />
            </div>
          </div>
          <h1 className="text-center text-white mb-3">
            Vagabond AR
          </h1>
          <p className="text-center text-slate-300">
            Explore the world through augmented reality
          </p>
        </div>

        {/* Bottom Section - CTA */}
        <div className="pb-12 space-y-4">
          <button
            onClick={onStartJourney}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform duration-300"
          >
            Start Journey
          </button>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-xl transition-all ${
                !isLogin
                  ? 'bg-white/10 backdrop-blur-lg border border-white/20 text-white'
                  : 'text-slate-400'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-xl transition-all ${
                isLogin
                  ? 'bg-white/10 backdrop-blur-lg border border-white/20 text-white'
                  : 'text-slate-400'
              }`}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
