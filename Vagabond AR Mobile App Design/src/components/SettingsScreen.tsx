import React, { useState } from 'react';
import { User, Bell, Shield, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const menuItems = [
    {
      icon: User,
      label: 'Account',
      description: 'Manage your profile',
      action: () => console.log('Account clicked')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: notificationsEnabled ? 'On' : 'Off',
      action: () => setNotificationsEnabled(!notificationsEnabled),
      hasToggle: true
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      description: 'Control your data',
      action: () => console.log('Privacy clicked')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get assistance',
      action: () => console.log('Help clicked')
    },
    {
      icon: Info,
      label: 'About',
      description: 'Version 1.0.0',
      action: () => console.log('About clicked')
    }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 to-slate-900 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 px-6 py-6">
        <h2 className="text-white mb-2">Settings</h2>
        <p className="text-slate-400">Manage your preferences</p>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-6">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">👤</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1">Travel Explorer</h3>
              <p className="text-slate-400 text-sm mb-2">explorer@vagabond.com</p>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-orange-500/20 border border-orange-400/30 rounded-full">
                  <span className="text-orange-400 text-xs">Gold Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 hover:border-cyan-400/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700/50 backdrop-blur-lg rounded-xl flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                      <Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="text-white mb-1">{item.label}</p>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>

                  {item.hasToggle ? (
                    <div
                      className={`w-12 h-7 rounded-full transition-colors ${
                        notificationsEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full mt-1 transition-transform ${
                          notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* App Info */}
        <div className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white mb-4">App Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-cyan-400 text-2xl mb-1">47</p>
              <p className="text-slate-400 text-xs">Places Visited</p>
            </div>
            <div className="text-center">
              <p className="text-orange-400 text-2xl mb-1">1.2K</p>
              <p className="text-slate-400 text-xs">AR Coins</p>
            </div>
            <div className="text-center">
              <p className="text-purple-400 text-2xl mb-1">23</p>
              <p className="text-slate-400 text-xs">Achievements</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-red-500/10 backdrop-blur-lg border border-red-400/30 rounded-2xl p-4 hover:bg-red-500/20 transition-all group">
          <div className="flex items-center justify-center gap-3">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Logout</span>
          </div>
        </button>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">Vagabond AR</p>
          <p className="text-slate-600 text-xs mt-1">© 2026 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}
