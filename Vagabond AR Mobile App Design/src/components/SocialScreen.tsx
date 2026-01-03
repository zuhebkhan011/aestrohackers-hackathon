import React from 'react';
import { Users, Lock, TrendingUp, Clock, MapPin, Star } from 'lucide-react';

interface GroupDeal {
  id: string;
  title: string;
  location: string;
  image: string;
  originalPrice: number;
  lockedPrice: number;
  currentParticipants: number;
  requiredParticipants: number;
  timeLeft: string;
  rating: number;
}

export default function SocialScreen() {
  const deals: GroupDeal[] = [
    {
      id: '1',
      title: 'Luxury Beach Resort',
      location: 'Maldives',
      image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzY3MzMzNzk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 450,
      lockedPrice: 299,
      currentParticipants: 7,
      requiredParticipants: 10,
      timeLeft: '2h 34m',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Mountain View Hotel',
      location: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1669986480140-2c90b8edb443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjczODI3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 380,
      lockedPrice: 249,
      currentParticipants: 5,
      requiredParticipants: 8,
      timeLeft: '5h 12m',
      rating: 4.9
    },
    {
      id: '3',
      title: 'City Center Boutique',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NzM2ODk3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 320,
      lockedPrice: 199,
      currentParticipants: 9,
      requiredParticipants: 12,
      timeLeft: '1h 45m',
      rating: 4.7
    }
  ];

  return (
    <div className="h-full bg-gradient-to-b from-slate-950 to-slate-900 overflow-y-auto pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-lg border-b border-white/10 px-6 py-6">
        <h2 className="text-white mb-2">Group Buy Deals</h2>
        <p className="text-slate-400">Join friends to unlock exclusive prices</p>
      </div>

      {/* Active Deals Section */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <h3 className="text-white">Hot Deals</h3>
        </div>

        <div className="space-y-4">
          {deals.map((deal) => {
            const progress = (deal.currentParticipants / deal.requiredParticipants) * 100;
            const savings = deal.originalPrice - deal.lockedPrice;
            const savingsPercent = Math.round((savings / deal.originalPrice) * 100);

            return (
              <div
                key={deal.id}
                className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all shadow-lg"
              >
                {/* Image with Badge */}
                <div className="relative h-48">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  {/* Time Left Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500/90 backdrop-blur-lg px-3 py-2 rounded-full">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{deal.timeLeft}</span>
                  </div>

                  {/* Savings Badge */}
                  <div className="absolute top-3 left-3 bg-orange-500/90 backdrop-blur-lg px-3 py-2 rounded-full">
                    <span className="text-white">Save {savingsPercent}%</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white mb-1">{deal.title}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{deal.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-500/20 backdrop-blur-lg border border-yellow-400/30 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 text-sm">{deal.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-400">${deal.lockedPrice}</span>
                    </div>
                    <span className="text-slate-500 line-through text-sm">${deal.originalPrice}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Users className="w-4 h-4" />
                        <span>{deal.currentParticipants}/{deal.requiredParticipants} joined</span>
                      </div>
                      <span className="text-cyan-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform">
                    Join Group ({deal.requiredParticipants - deal.currentParticipants} spots left)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it Works */}
      <div className="px-6 pb-6">
        <div className="bg-slate-800/40 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-white mb-4">How Group Buy Works</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">1</span>
              </div>
              <p className="text-slate-300 text-sm">Choose a deal and join the group</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">2</span>
              </div>
              <p className="text-slate-300 text-sm">Invite friends or wait for others to join</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400">3</span>
              </div>
              <p className="text-slate-300 text-sm">Unlock the exclusive price when group is full</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
