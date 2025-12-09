
import React, { useState } from 'react';
import { ITINERARY_DATA } from './data/itinerary';
import MapView from './components/MapView';
import ItineraryCard from './components/ItineraryCard';
import Dashboard from './components/Dashboard';
import TransportGuide from './components/TransportGuide';
import { List, MapIcon, Home, TrainFront } from './components/ui/Icons';

enum Tab {
  DASHBOARD = 'dashboard',
  TIMELINE = 'timeline',
  MAP = 'map',
  TRAFFIC = 'traffic'
}

import PWAInstallPrompt from './components/PWAInstallPrompt';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const currentDay = ITINERARY_DATA[selectedDayIndex];

  // Helper to scroll to day selector - No longer scrolls window, but container if needed
  const handleDayChange = (index: number) => {
    setSelectedDayIndex(index);
    setActiveItemId(null);
  };

  return (
    // Outer Container: Fixed to viewport height, no global scroll.
    // max-w-md mx-auto keeps phone shape on desktop.
    <div className="h-[100dvh] w-full max-w-md mx-auto bg-[#FDFBF7] text-stone-900 font-sans flex flex-col relative shadow-2xl overflow-hidden">
      <PWAInstallPrompt />

      {/* Top Navigation / Day Selector - Only visible on Timeline & Map */}
      {/* This stays fixed at the top because it's outside the scrolling <main> */}
      {(activeTab === Tab.TIMELINE || activeTab === Tab.MAP) && (
        <div className="z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 pt-safe-top shrink-0">
          <div className="flex overflow-x-auto no-scrollbar py-4 px-4 gap-4 snap-x">
            {ITINERARY_DATA.map((day, idx) => (
              <button
                key={day.date}
                onClick={() => handleDayChange(idx)}
                className={`
                  snap-start flex-shrink-0 flex flex-col items-center justify-center
                  w-12 h-16 transition-all duration-300 border-y-2
                  ${selectedDayIndex === idx
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-300 hover:text-stone-500'}
                `}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest writing-vertical mb-2 opacity-80">{day.dayOfWeek}</span>
                <span className="text-xl font-display italic font-bold leading-none">{day.date.split('/')[1]}</span>
              </button>
            ))}
          </div>
          <div className="px-6 pb-4 pt-2">
            <div className="flex justify-between items-baseline border-l-2 border-[#C44302] pl-3">
              <h2 className="text-2xl font-serif font-bold tracking-tight text-stone-900">{currentDay.title} <span className="text-stone-400 font-normal text-lg ml-1">in {currentDay.city}</span></h2>
              <span className="text-xs font-bold text-[#C44302] tracking-widest uppercase">{currentDay.theme}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - This is the only thing that scrolls */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative scroll-smooth pb-24">

        {/* VIEW: DASHBOARD (HOME) */}
        {activeTab === Tab.DASHBOARD && (
          <Dashboard />
        )}

        {/* VIEW: TIMELINE */}
        {activeTab === Tab.TIMELINE && (
          <div className="p-5 animate-in fade-in duration-300">
            <div className="space-y-0">
              {currentDay.items.map((item) => (
                <ItineraryCard
                  key={item.id}
                  item={item}
                  isActive={activeItemId === item.id}
                  onClick={() => setActiveItemId(activeItemId === item.id ? null : item.id)}
                />
              ))}
            </div>
            {/* End of Day decoration - Easter egg: triple tap reveals message */}
            <div className="text-center mt-12 mb-12 text-stone-300">
              <div className="text-xs font-serif italic tracking-widest">End of {currentDay.title}</div>
              <div className="w-1 h-8 bg-stone-200 mx-auto mt-2"></div>
              <div className="text-[8px] text-stone-200 mt-2 select-none">with love ♡</div>
            </div>
          </div>
        )}

        {/* VIEW: TRAFFIC */}
        {activeTab === Tab.TRAFFIC && (
          <TransportGuide />
        )}

        {/* VIEW: MAP */}
        {activeTab === Tab.MAP && (
          // Map needs full height of the remaining space
          <div className="h-full w-full relative animate-in fade-in duration-300">
            <MapView
              dayPlan={currentDay}
              activeItemId={activeItemId || undefined}
              onActiveItemChange={setActiveItemId}
            />
          </div>
        )}

      </main>

      {/* Bottom Tab Navigation - Fixed to bottom of container */}
      {/* pb-[env(safe-area-inset-bottom)] handles iPhone Home Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-stone-200 px-6 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex justify-between items-center z-[2000]">
        <button
          onClick={() => setActiveTab(Tab.DASHBOARD)}
          className={`flex flex-col items-center gap-1.5 p-2 w-16 transition-all duration-300 active:scale-95 ${activeTab === Tab.DASHBOARD ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
        >
          <Home className="w-6 h-6" strokeWidth={activeTab === Tab.DASHBOARD ? 2 : 1.5} />
          <span className="text-[9px] font-bold tracking-widest uppercase">Home</span>
        </button>

        <button
          onClick={() => setActiveTab(Tab.TIMELINE)}
          className={`flex flex-col items-center gap-1.5 p-2 w-16 transition-all duration-300 active:scale-95 ${activeTab === Tab.TIMELINE ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
        >
          <List className="w-6 h-6" strokeWidth={activeTab === Tab.TIMELINE ? 2 : 1.5} />
          <span className="text-[9px] font-bold tracking-widest uppercase">Plan</span>
        </button>

        <button
          onClick={() => setActiveTab(Tab.TRAFFIC)}
          className={`flex flex-col items-center gap-1.5 p-2 w-16 transition-all duration-300 active:scale-95 ${activeTab === Tab.TRAFFIC ? 'text-[#C44302]' : 'text-stone-300 hover:text-stone-500'}`}
        >
          <TrainFront className="w-6 h-6" strokeWidth={activeTab === Tab.TRAFFIC ? 2 : 1.5} />
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#C44302]">Traffic</span>
        </button>

        <button
          onClick={() => setActiveTab(Tab.MAP)}
          className={`flex flex-col items-center gap-1.5 p-2 w-16 transition-all duration-300 active:scale-95 ${activeTab === Tab.MAP ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
        >
          <MapIcon className="w-6 h-6" strokeWidth={activeTab === Tab.MAP ? 2 : 1.5} />
          <span className="text-[9px] font-bold tracking-widest uppercase">Map</span>
        </button>
      </div>

    </div>
  );
};

export default App;
