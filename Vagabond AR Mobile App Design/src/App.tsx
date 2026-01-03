import React, { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import DashboardScreen from './components/DashboardScreen';
import DiaryScreen from './components/DiaryScreen';
import SocialScreen from './components/SocialScreen';
import SavingsScreen from './components/SavingsScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNav from './components/BottomNav';

export type Screen = 'onboarding' | 'dashboard' | 'diary' | 'social' | 'savings' | 'settings';

export interface TravelLog {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  note: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [travelLogs, setTravelLogs] = useState<TravelLog[]>([
    {
      id: '1',
      title: 'Mountain Peak Adventure',
      location: 'Swiss Alps, Switzerland',
      date: '2025-12-15',
      image: 'https://images.unsplash.com/photo-1669986480140-2c90b8edb443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjczODI3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      note: 'Reached the summit at sunrise. The view was absolutely breathtaking. Snow-capped peaks as far as the eye can see.'
    },
    {
      id: '2',
      title: 'Tropical Paradise',
      location: 'Maldives',
      date: '2025-11-28',
      image: 'https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2NzM2MDYzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      note: 'Crystal clear waters and the most stunning sunset. Pure relaxation and tranquility.'
    },
    {
      id: '3',
      title: 'Tokyo Nights',
      location: 'Shibuya, Tokyo',
      date: '2025-10-20',
      image: 'https://images.unsplash.com/photo-1641558996066-fcf78962c30a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRva3lvJTIwc3RyZWV0fGVufDF8fHx8MTc2NzM1NTMxNnww&ixlib=rb-4.1.0&q=80&w=1080',
      note: 'The neon lights and bustling streets of Shibuya at night. An unforgettable urban experience.'
    },
    {
      id: '4',
      title: 'Parisian Dream',
      location: 'Paris, France',
      date: '2025-09-05',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NzM2ODk3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      note: 'First time seeing the Eiffel Tower. The city of love truly lives up to its name.'
    }
  ]);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [savingsAmount, setSavingsAmount] = useState(2450);

  const handleStartJourney = () => {
    setHasOnboarded(true);
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleAddLog = (log: Omit<TravelLog, 'id'>) => {
    const newLog: TravelLog = {
      ...log,
      id: Date.now().toString()
    };
    setTravelLogs([newLog, ...travelLogs]);
    setCurrentScreen('diary');
  };

  const handleDeleteLog = (id: string) => {
    setTravelLogs(travelLogs.filter(log => log.id !== id));
  };

  const handleEditLog = (updatedLog: TravelLog) => {
    setTravelLogs(travelLogs.map(log => log.id === updatedLog.id ? updatedLog : log));
  };

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen onStartJourney={handleStartJourney} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto h-screen max-h-[844px] bg-slate-950 relative overflow-hidden rounded-3xl shadow-2xl">
        {currentScreen === 'dashboard' && (
          <DashboardScreen 
            dailyStreak={dailyStreak} 
            onAddLog={() => handleNavigate('diary')} 
          />
        )}
        {currentScreen === 'diary' && (
          <DiaryScreen
            logs={travelLogs}
            onDeleteLog={handleDeleteLog}
            onEditLog={handleEditLog}
            onAddLog={handleAddLog}
          />
        )}
        {currentScreen === 'social' && <SocialScreen />}
        {currentScreen === 'savings' && (
          <SavingsScreen 
            savingsAmount={savingsAmount} 
            onAddFunds={(amount) => setSavingsAmount(savingsAmount + amount)} 
          />
        )}
        {currentScreen === 'settings' && <SettingsScreen />}

        <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}
