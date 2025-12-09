
import React, { useState } from 'react';
import { ItineraryItem, ActivityType } from '../types';
import { ActivityIcon, ChevronDown, ChevronUp, Car, MapIcon, Navigation, Train, Footprints, Signpost, BedDouble } from './ui/Icons';

interface ItineraryCardProps {
  item: ItineraryItem;
  isActive: boolean;
  onClick?: () => void;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ item, isActive, onClick }) => {
  const [showTaxi, setShowTaxi] = useState(false);
  const [showBackups, setShowBackups] = useState(false);

  // Styling based on activity type
  const getTypeColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.FOOD: return 'text-red-500 bg-red-50';
      case ActivityType.SIGHTSEEING: return 'text-blue-500 bg-blue-50';
      case ActivityType.TRAIN: return 'text-emerald-600 bg-emerald-50';
      case ActivityType.FLIGHT: return 'text-slate-600 bg-slate-100';
      case ActivityType.CHECKLIST: return 'text-amber-600 bg-amber-50';
      case ActivityType.HOTEL: return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const typeClass = getTypeColor(item.type);

  // Taxi Card Overlay
  if (showTaxi && item.japaneseAddress) {
    return (
      <div className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200" onClick={(e) => { e.stopPropagation(); setShowTaxi(false); }}>
        <p className="text-gray-400 mb-4 text-lg">請出示給司機看</p>
        <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
           <p className="text-2xl font-bold text-gray-900 leading-relaxed font-serif py-10">
             {item.japaneseAddress}
           </p>
        </div>
        <button className="mt-8 text-white px-8 py-3 rounded-full border border-white/30 active:bg-white/10 transition-colors">關閉</button>
      </div>
    );
  }

  // Special Hotel Style
  const isHotel = item.type === ActivityType.HOTEL;

  return (
    <div 
      className={`relative pl-4 pb-8 border-l-2 last:border-l-0 ${isActive ? 'border-indigo-500' : 'border-gray-200'}`}
      onClick={onClick}
    >
      {/* Timeline Dot */}
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors duration-300 ${isActive ? 'bg-indigo-600' : isHotel ? 'bg-purple-400' : 'bg-gray-300'}`} />

      {/* Time */}
      <div className={`text-xs font-semibold mb-1 tracking-wide ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>
        {item.time}
      </div>

      {/* Card Body */}
      <div className={`
        rounded-2xl p-4 transition-all duration-300 shadow-sm border
        ${isActive ? 'bg-white border-indigo-100 shadow-md transform scale-[1.01]' : 'bg-white border-gray-100 opacity-90'}
        ${isHotel ? 'border-l-4 border-l-purple-400' : ''}
      `}>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800 text-lg leading-tight tracking-tight">{item.title}</h3>
          <div className={`p-2 rounded-full flex-shrink-0 ml-2 ${typeClass}`}>
            <ActivityIcon type={item.type} className="w-4 h-4" />
          </div>
        </div>
        
        {/* Address Display */}
        {item.address && (
           <p className="text-xs text-gray-400 mb-2 font-medium">{item.address}</p>
        )}

        {/* Transport Dashboard - Only shows if transport info exists */}
        {item.transport && (
            <div className="my-3 bg-slate-800 rounded-xl p-3 text-white shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <Train className="w-24 h-24" />
                </div>
                <div className="flex justify-between items-center mb-2 relative z-10">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400">Transport Info</span>
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{item.transport.platform || 'Platform ?'}</span>
                </div>
                <div className="relative z-10">
                    <p className="text-lg font-bold leading-none mb-1">{item.transport.line}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span>{item.transport.station}</span>
                        <span>➜</span>
                        <span className="text-white font-bold">{item.transport.destination}</span>
                    </div>
                </div>
            </div>
        )}

        <p className="text-sm text-gray-600 mb-4 leading-relaxed tracking-wide text-justify">
          {item.description}
        </p>

        {/* Walking Guide Box */}
        {item.walkingGuide && (isActive || item.transport) && (
            <div className="mb-4 bg-[#FDFBF7] border border-stone-200 rounded-lg p-3 flex gap-3">
                <div className="mt-0.5 text-stone-400 flex-shrink-0">
                    <Footprints className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-0.5">Walking Guide</p>
                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        {item.walkingGuide}
                    </p>
                </div>
            </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex gap-2 flex-wrap">
          {item.japaneseAddress && (
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTaxi(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg active:scale-95 transition-transform shadow-sm"
            >
              <Car className="w-3 h-3" />
              <span>給司機看</span>
            </button>
          )}
          
          {item.googleMapsUrl && (
             <a 
              href={item.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg active:scale-95 transition-transform border border-blue-100"
             >
                <Navigation className="w-3 h-3" />
                <span>導航</span>
             </a>
          )}

          {item.backups && item.backups.length > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setShowBackups(!showBackups); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${showBackups ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-white text-gray-600 border-gray-200'}`}
            >
              <span>{showBackups ? '隱藏備案' : `備案 (${item.backups.length})`}</span>
              {showBackups ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Notes & Backups Section */}
        {((item.notes && isActive) || showBackups) && (
          <div className="mt-4 pt-3 border-t border-gray-100 animate-in slide-in-from-top-2">
            {item.notes && (
              <div className="mb-3 text-xs bg-yellow-50 text-yellow-800 p-3 rounded-lg border border-yellow-100 leading-relaxed">
                <span className="font-bold mr-1">💡 筆記:</span> {item.notes}
              </div>
            )}
            
            {showBackups && item.backups?.map((backup, idx) => (
              <div key={idx} className="mb-2 last:mb-0 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-gray-700">{backup.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 border border-gray-200 px-1 rounded bg-white">{backup.type}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{backup.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
