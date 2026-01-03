import React, { useState } from 'react';
import { TrendingUp, Target, PiggyBank, Plus, Sparkles } from 'lucide-react';
import VirtualPet from './VirtualPet';

interface SavingsScreenProps {
  savingsAmount: number;
  onAddFunds: (amount: number) => void;
}

export default function SavingsScreen({ savingsAmount, onAddFunds }: SavingsScreenProps) {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');

  const savingsGoal = 5000;
  const progress = (savingsAmount / savingsGoal) * 100;
  const petGrowth = Math.min(Math.floor(progress / 20), 5); // 0-5 growth stages

  const quickAmounts = [50, 100, 250, 500];

  const handleAddFunds = (value: number) => {
    onAddFunds(value);
    setAmount('');
    setShowAddFunds(false);
  };

  const getPetSize = () => {
    const sizes = ['text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl'];
    return sizes[Math.min(petGrowth, sizes.length - 1)];
  };

  const getPetMessage = () => {
    if (petGrowth === 0) return "I'm just a baby! Feed me with savings!";
    if (petGrowth === 1) return "I'm growing! Keep it up!";
    if (petGrowth === 2) return "Getting bigger! You're doing great!";
    if (petGrowth === 3) return "Almost there! I can feel it!";
    if (petGrowth === 4) return "So close to my final form!";
    return "We did it! Time to travel!";
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 to-slate-900 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 px-6 py-6">
        <h2 className="text-white mb-2">Travel Fund</h2>
        <p className="text-slate-400">Save for your next adventure</p>
      </div>

      {/* Virtual Pet Growth */}
      <div className="px-6 py-8">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-3xl p-8 mb-6 relative overflow-hidden">
          {/* Sparkles Background */}
          <div className="absolute inset-0 opacity-20">
            <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute bottom-6 left-6 w-6 h-6 text-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Sparkles className="absolute top-1/2 left-1/3 w-5 h-5 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Pet Display */}
          <div className="flex flex-col items-center relative z-10">
            <div className={`${getPetSize()} mb-4 transition-all duration-500`}>
              🐾
            </div>
            <div className="bg-slate-900/60 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3 mb-2">
              <p className="text-white text-center text-sm">{getPetMessage()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-300 text-sm">Growth Stage:</span>
              <span className="text-purple-400">{petGrowth}/5</span>
            </div>
          </div>
        </div>

        {/* Savings Progress */}
        <div className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-orange-400" />
              <span className="text-white">Current Savings</span>
            </div>
            <span className="text-white">${savingsAmount.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300 text-sm">Goal</span>
            </div>
            <span className="text-cyan-400">${savingsGoal.toLocaleString()}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">{Math.round(progress)}% Complete</span>
            <span className="text-slate-400 text-sm">${savingsGoal - savingsAmount} to go</span>
          </div>
        </div>

        {/* Add Funds Button */}
        {!showAddFunds ? (
          <button
            onClick={() => setShowAddFunds(true)}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Funds
          </button>
        ) : (
          <div className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-white">Add to Travel Fund</h3>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => handleAddFunds(quickAmount)}
                  className="py-3 bg-slate-700/50 backdrop-blur-lg border border-white/10 rounded-xl text-white hover:border-cyan-400/30 hover:bg-slate-700 transition-all"
                >
                  ${quickAmount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-slate-300 text-sm mb-2">Custom Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-3 bg-slate-700/50 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
                <button
                  onClick={() => amount && handleAddFunds(Number(amount))}
                  disabled={!amount || Number(amount) <= 0}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Add
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAddFunds(false)}
              className="w-full py-3 bg-slate-700/50 backdrop-blur-lg border border-white/10 rounded-xl text-slate-300 hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Milestones */}
        <div className="mt-6 bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white">Milestones</h3>
          </div>

          <div className="space-y-3">
            {[
              { amount: 1000, reward: 'Bronze Traveler Badge', completed: savingsAmount >= 1000 },
              { amount: 2500, reward: 'Silver Wanderer Badge', completed: savingsAmount >= 2500 },
              { amount: 5000, reward: 'Gold Explorer Badge', completed: savingsAmount >= 5000 }
            ].map((milestone) => (
              <div
                key={milestone.amount}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  milestone.completed
                    ? 'bg-cyan-500/10 border-cyan-400/30'
                    : 'bg-slate-700/30 border-white/10'
                }`}
              >
                <div>
                  <p className={milestone.completed ? 'text-cyan-400' : 'text-slate-300'}>
                    ${milestone.amount.toLocaleString()}
                  </p>
                  <p className="text-slate-400 text-sm">{milestone.reward}</p>
                </div>
                {milestone.completed && (
                  <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center">
                    <span className="text-cyan-400">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
